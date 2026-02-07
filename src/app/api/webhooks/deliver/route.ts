import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface WebhookPayload {
  event: string
  timestamp: string
  data: any
  webhookId: string
}

// POST /api/webhooks/deliver
// Internal endpoint to deliver webhooks with retry logic
export async function POST(request: NextRequest) {
  try {
    // Verify internal request (from your own service)
    const authHeader = request.headers.get('x-internal-token')
    if (authHeader !== process.env.INTERNAL_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { webhookId, payload } = await request.json() as { webhookId: string; payload: WebhookPayload }

    if (!webhookId || !payload) {
      return NextResponse.json(
        { error: 'Missing webhookId or payload' },
        { status: 400 }
      )
    }

    // Get webhook
    const webhook = await prisma.webhook.findUnique({
      where: { id: webhookId }
    })

    if (!webhook || !webhook.active) {
      return NextResponse.json(
        { error: 'Webhook not found or inactive' },
        { status: 404 }
      )
    }

    // Attempt to deliver webhook
    return await deliverWebhook(webhook, payload)
  } catch (error) {
    console.error('Webhook delivery error:', error)
    return NextResponse.json(
      { error: 'Webhook delivery failed' },
      { status: 500 }
    )
  }
}

// Internal function to deliver webhook with retries
async function deliverWebhook(webhook: any, payload: WebhookPayload, retryCount = 0) {
  const maxRetries = 5
  const backoffMultiplier = 2

  try {
    // Add signature to payload for security
    const signature = generateWebhookSignature(payload, process.env.WEBHOOK_SECRET || 'secret')

    // Attempt delivery
    const response = await fetch(webhook.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'X-Webhook-Event': payload.event,
        'X-Webhook-Timestamp': payload.timestamp,
        'X-Webhook-ID': webhook.id
      },
      body: JSON.stringify(payload)
    })

    const responseText = await response.text()

    // Log webhook attempt
    await prisma.webhookLog.create({
      data: {
        webhookId: webhook.id,
        event: payload.event,
        status: response.status,
        responseCode: response.status,
        responseBody: responseText.slice(0, 500), // Limit to 500 chars
        attempts: retryCount + 1,
        success: response.status >= 200 && response.status < 300
      }
    })

    // Update webhook last triggered
    await prisma.webhook.update({
      where: { id: webhook.id },
      data: {
        lastTriggered: new Date(),
        retryCount: 0
      }
    })

    if (response.ok) {
      return NextResponse.json({
        success: true,
        status: response.status,
        message: 'Webhook delivered successfully'
      })
    } else if (response.status >= 400 && response.status < 500) {
      // Client error - don't retry
      return NextResponse.json({
        success: false,
        status: response.status,
        message: 'Client error - webhook not delivered'
      })
    } else {
      // Server error - retry
      throw new Error(`Server error: ${response.status}`)
    }
  } catch (error) {
    console.error(`Webhook delivery attempt ${retryCount + 1} failed:`, error)

    // Log failed attempt
    await prisma.webhookLog.create({
      data: {
        webhookId: webhook.id,
        event: payload.event,
        status: 0,
        responseCode: 0,
        responseBody: String(error),
        attempts: retryCount + 1,
        success: false
      }
    })

    if (retryCount < maxRetries) {
      // Schedule retry with exponential backoff
      const delayMs = Math.pow(backoffMultiplier, retryCount) * 1000 // 1s, 2s, 4s, 8s, 16s
      const retryTime = new Date(Date.now() + delayMs)

      // In production, use a job queue (Bull, Inngest, etc.) to schedule retry
      // For now, we'll create a simple retry mechanism
      setTimeout(async () => {
        await deliverWebhook(webhook, payload, retryCount + 1)
      }, delayMs)

      return NextResponse.json({
        success: false,
        status: 0,
        message: `Webhook delivery failed. Retrying in ${delayMs}ms (attempt ${retryCount + 1}/${maxRetries})`
      })
    } else {
      // Max retries exceeded
      await prisma.webhook.update({
        where: { id: webhook.id },
        data: {
          active: false, // Disable webhook after max retries
          retryCount: maxRetries
        }
      })

      return NextResponse.json({
        success: false,
        status: 0,
        message: `Webhook delivery failed after ${maxRetries} retries. Webhook disabled.`
      })
    }
  }
}

// Generate HMAC signature for webhook
function generateWebhookSignature(payload: any, secret: string): string {
  const crypto = require('crypto')
  const body = JSON.stringify(payload)
  return crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')
}

// Helper function to trigger webhook from internal services
export async function triggerWebhook(event: string, data: any, companyId: string) {
  try {
    // Find all webhooks for this company subscribed to this event
    const webhooks = await prisma.webhook.findMany({
      where: {
        companyId,
        active: true,
        events: {
          has: event
        }
      }
    })

    if (webhooks.length === 0) {
      return
    }

    const timestamp = new Date().toISOString()

    // Trigger webhooks
    for (const webhook of webhooks) {
      const payload: WebhookPayload = {
        event,
        timestamp,
        data,
        webhookId: webhook.id
      }

      // Send to delivery system
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/webhooks/deliver`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Internal-Token': process.env.INTERNAL_WEBHOOK_SECRET || 'secret'
          },
          body: JSON.stringify({
            webhookId: webhook.id,
            payload
          })
        })
      } catch (error) {
        console.error(`Failed to trigger webhook ${webhook.id}:`, error)
      }
    }
  } catch (error) {
    console.error('Error triggering webhooks:', error)
  }
}
