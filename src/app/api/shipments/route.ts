import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit, getRateLimitHeaders } from '@/lib/rate-limit'

// GET /api/shipments - List all shipments
export async function GET(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitResult = rateLimit(`shipments-get-${ip}`)
    
    if (!rateLimitResult.success) {
      return new NextResponse('Too many requests', {
        status: 429,
        headers: getRateLimitHeaders(0),
      })
    }

    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('companyId')
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}
    if (companyId) where.companyId = companyId
    if (status) where.status = status

    const shipments = await prisma.shipment.findMany({
      where,
      include: {
        customer: true,
        trackingEvents: {
          orderBy: { timestamp: 'desc' },
          take: 5
        },
        packages: true
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    })

    const total = await prisma.shipment.count({ where })

    return NextResponse.json({
      success: true,
      data: shipments,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    }, {
      headers: getRateLimitHeaders(rateLimitResult.remaining)
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST /api/shipments - Create new shipment
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const required = ['companyId', 'senderName', 'senderAddress', 'receiverName', 'receiverAddress']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Generate tracking number
    const trackingNumber = `FF-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    const shipment = await prisma.shipment.create({
      data: {
        trackingNumber,
        ...body,
        status: 'PENDING',
        trackingEvents: {
          create: {
            status: 'PENDING',
            location: body.senderAddress,
            description: 'Shipment created',
            timestamp: new Date()
          }
        }
      },
      include: {
        trackingEvents: true,
        customer: true
      }
    })

    // Trigger webhook
    await triggerWebhook(body.companyId, 'shipment.created', shipment)

    return NextResponse.json({
      success: true,
      data: shipment
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// Webhook helper function
async function triggerWebhook(companyId: string, event: string, data: any) {
  try {
    const webhooks = await prisma.webhook.findMany({
      where: {
        companyId,
        isActive: true,
        events: {
          has: event
        }
      }
    })

    for (const webhook of webhooks) {
      try {
        const response = await fetch(webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-FastForward-Signature': webhook.secret
          },
          body: JSON.stringify({
            event,
            data,
            timestamp: new Date().toISOString()
          })
        })

        await prisma.webhookLog.create({
          data: {
            webhookId: webhook.id,
            event,
            payload: data,
            statusCode: response.status,
            response: await response.json().catch(() => null)
          }
        })
      } catch (error: any) {
        await prisma.webhookLog.create({
          data: {
            webhookId: webhook.id,
            event,
            payload: data,
            errorMessage: error.message
          }
        })
      }
    }
  } catch (error) {
    console.error('Webhook trigger failed:', error)
  }
}
