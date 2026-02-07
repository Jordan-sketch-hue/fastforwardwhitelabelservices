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

// GET /api/partner/webhooks
// List all webhooks for the authenticated partner
export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyPartnerToken(request)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const webhooks = await prisma.webhook.findMany({
      where: { companyId: decoded.companyId },
      include: {
        logs: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ data: webhooks })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch webhooks' },
      { status: 500 }
    )
  }
}

// POST /api/partner/webhooks
// Register a new webhook
export async function POST(request: NextRequest) {
  try {
    const decoded = await verifyPartnerToken(request)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { url, events, active, description } = await request.json()

    if (!url || !events || events.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields (url, events)' },
        { status: 400 }
      )
    }

    // Validate URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid webhook URL' },
        { status: 400 }
      )
    }

    // Validate events
    const validEvents = [
      'shipment.created',
      'shipment.updated',
      'shipment.delivered',
      'shipment.failed',
      'package.picked_up',
      'package.in_transit',
      'package.delivered',
      'balance.low',
      'rate_limit.warning'
    ]

    for (const event of events) {
      if (!validEvents.includes(event)) {
        return NextResponse.json(
          { error: `Invalid event: ${event}` },
          { status: 400 }
        )
      }
    }

    // Create webhook
    const webhook = await prisma.webhook.create({
      data: {
        url,
        events,
        active: active !== false,
        description,
        companyId: decoded.companyId,
        retryCount: 0,
        lastTriggered: null
      }
    })

    return NextResponse.json(webhook, { status: 201 })
  } catch (error) {
    console.error('Create webhook error:', error)
    return NextResponse.json(
      { error: 'Failed to create webhook' },
      { status: 500 }
    )
  }
}

// PATCH /api/partner/webhooks/[id]
// Update a webhook
export async function PATCH(request: NextRequest) {
  try {
    const decoded = await verifyPartnerToken(request)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Extract webhook ID from URL
    const urlParts = request.url.split('/')
    const webhookId = urlParts[urlParts.length - 1]

    if (!webhookId) {
      return NextResponse.json(
        { error: 'Missing webhook ID' },
        { status: 400 }
      )
    }

    // Verify webhook belongs to company
    const webhook = await prisma.webhook.findUnique({
      where: { id: webhookId }
    })

    if (!webhook || webhook.companyId !== decoded.companyId) {
      return NextResponse.json(
        { error: 'Webhook not found' },
        { status: 404 }
      )
    }

    const { url, events, active, description } = await request.json()

    const updated = await prisma.webhook.update({
      where: { id: webhookId },
      data: {
        ...(url && { url }),
        ...(events && { events }),
        ...(active !== undefined && { active }),
        ...(description && { description })
      }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update webhook error:', error)
    return NextResponse.json(
      { error: 'Failed to update webhook' },
      { status: 500 }
    )
  }
}

// DELETE /api/partner/webhooks/[id]
// Delete a webhook
export async function DELETE(request: NextRequest) {
  try {
    const decoded = await verifyPartnerToken(request)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Extract webhook ID from URL
    const urlParts = request.url.split('/')
    const webhookId = urlParts[urlParts.length - 1]

    if (!webhookId) {
      return NextResponse.json(
        { error: 'Missing webhook ID' },
        { status: 400 }
      )
    }

    // Verify webhook belongs to company
    const webhook = await prisma.webhook.findUnique({
      where: { id: webhookId }
    })

    if (!webhook || webhook.companyId !== decoded.companyId) {
      return NextResponse.json(
        { error: 'Webhook not found' },
        { status: 404 }
      )
    }

    await prisma.webhook.delete({
      where: { id: webhookId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete webhook error:', error)
    return NextResponse.json(
      { error: 'Failed to delete webhook' },
      { status: 500 }
    )
  }
}
