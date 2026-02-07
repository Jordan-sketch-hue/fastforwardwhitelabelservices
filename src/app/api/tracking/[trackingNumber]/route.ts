import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  try {
    const { trackingNumber } = await params

    // Find shipment with all tracking events
    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        trackingEvents: {
          orderBy: { timestamp: 'desc' },
        },
        packages: true,
        company: {
          select: {
            id: true,
            name: true,
            brandColor: true,
            logo: true,
          },
        },
      },
    })

    if (!shipment) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      )
    }

    // Calculate delivery progress
    const statusOrder = [
      'PENDING',
      'PICKED_UP',
      'IN_TRANSIT',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
    ]
    const currentIndex = statusOrder.indexOf(shipment.status)
    const progress = currentIndex >= 0 ? ((currentIndex + 1) / statusOrder.length) * 100 : 0

    // Estimate delivery if not delivered
    let estimatedDelivery = null
    if (shipment.status !== 'DELIVERED' && shipment.status !== 'CANCELLED') {
      // Simple estimation: add days based on priority
      const priorityDays: Record<string, number> = {
        EXPRESS: 1,
        STANDARD: 3,
        ECONOMY: 5,
        INTERNATIONAL: 7,
      }
      const daysToAdd = priorityDays[shipment.priority] || 3

      estimatedDelivery = new Date(shipment.createdAt)
      estimatedDelivery.setDate(estimatedDelivery.getDate() + daysToAdd)
    }

    return NextResponse.json({
      shipment: {
        ...shipment,
        progress,
        estimatedDelivery,
      },
    })
  } catch (error) {
    console.error('Tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve tracking information' },
      { status: 500 }
    )
  }
}

// Update shipment status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  try {
    const { trackingNumber } = await params
    const body = await request.json()
    const { status, location, notes, latitude, longitude } = body

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    // Update shipment
    const shipment = await prisma.shipment.update({
      where: { trackingNumber },
      data: {
        status,
        trackingEvents: {
          create: {
            status,
            location: location || 'Unknown',
            description: notes || `Shipment status updated to ${status}`,
            latitude,
            longitude,
          },
        },
      },
      include: {
        trackingEvents: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
    })

    // Trigger webhooks for status update
    await triggerWebhook(shipment.companyId, 'shipment.status_updated', shipment)

    // Send notification to customer
    if (shipment.customerId) {
      await prisma.notification.create({
        data: {
          userId: shipment.customerId,
          companyId: shipment.companyId,
          type: 'SHIPMENT_UPDATE',
          title: 'Shipment Status Updated',
          message: `Your shipment ${trackingNumber} is now ${status}`,
          channel: 'EMAIL',
          metadata: {
            shipmentId: shipment.id,
            trackingNumber: shipment.trackingNumber,
            status,
          },
        },
      })
    }

    return NextResponse.json({ shipment })
  } catch (error) {
    console.error('Status update error:', error)
    return NextResponse.json(
      { error: 'Failed to update shipment status' },
      { status: 500 }
    )
  }
}

async function triggerWebhook(companyId: string, event: string, data: any) {
  try {
    const webhooks = await prisma.webhook.findMany({
      where: {
        companyId,
        active: true,
        events: {
          has: event,
        },
      },
    })

    for (const webhook of webhooks) {
      try {
        const response = await fetch(webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Signature': webhook.secret,
          },
          body: JSON.stringify({
            event,
            data,
            timestamp: new Date().toISOString(),
          }),
        })

        await prisma.webhookLog.create({
          data: {
            webhookId: webhook.id,
            event,
            payload: data,
            responseStatus: response.status,
            success: response.ok,
          },
        })
      } catch (error) {
        await prisma.webhookLog.create({
          data: {
            webhookId: webhook.id,
            event,
            payload: data,
            responseStatus: 0,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          },
        })
      }
    }
  } catch (error) {
    console.error('Webhook trigger error:', error)
  }
}
