import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verify } from 'jsonwebtoken'

// Middleware to verify partner token
async function verifyPartnerToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  try {
    const token = authHeader.slice(7)
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    
    if (decoded.type !== 'partner_api') {
      return null
    }

    return decoded
  } catch (error) {
    return null
  }
}

// GET /api/partner/tracking/[trackingNumber]
// Get shipment details by tracking number
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  try {
    const decoded = await verifyPartnerToken(request)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { trackingNumber } = await params

    // Find shipment for this company
    const shipment = await prisma.shipment.findFirst({
      where: {
        trackingNumber,
        companyId: decoded.companyId
      },
      include: {
        packages: true,
        trackingEvents: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!shipment) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      )
    }

    // Calculate status percentage
    const statusSteps = ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered']
    const currentStatusIndex = statusSteps.indexOf(shipment.status)
    const progressPercentage = ((currentStatusIndex + 1) / statusSteps.length) * 100

    // Log API call
    await prisma.apiLog.create({
      data: {
        apiKeyId: decoded.apiKeyId,
        method: 'GET',
        endpoint: `/partner/tracking/${trackingNumber}`,
        status: 200,
        responseTime: 80,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown'
      }
    })

    return NextResponse.json({
      tracking: {
        trackingNumber: shipment.trackingNumber,
        status: shipment.status,
        progressPercentage,
        estimatedDelivery: shipment.estimatedDelivery,
        currentLocation: shipment.trackingEvents[0]?.location || 'In transit',
        customerName: shipment.customerName,
        customerEmail: shipment.customerEmail,
        customerPhone: shipment.customerPhone,
        pickupAddress: shipment.pickupAddress,
        dropoffAddress: shipment.dropoffAddress,
        totalCost: shipment.totalCost,
        notes: shipment.notes,
        createdAt: shipment.createdAt,
        updatedAt: shipment.updatedAt
      },
      packages: shipment.packages,
      events: shipment.trackingEvents.map((event: any) => ({
        status: event.status,
        location: event.location,
        timestamp: event.createdAt,
        notes: event.notes
      }))
    })
  } catch (error) {
    console.error('Get tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve tracking information' },
      { status: 500 }
    )
  }
}
