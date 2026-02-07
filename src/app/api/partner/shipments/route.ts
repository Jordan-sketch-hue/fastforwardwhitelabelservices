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

// GET /api/partner/shipments
// List shipments for the authenticated partner company
export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyPartnerToken(request)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status')
    const fromDate = searchParams.get('from')
    const toDate = searchParams.get('to')

    // Build filters
    const where: any = {
      companyId: decoded.companyId
    }

    if (status) {
      where.status = status
    }

    if (fromDate || toDate) {
      where.createdAt = {}
      if (fromDate) where.createdAt.gte = new Date(fromDate)
      if (toDate) where.createdAt.lte = new Date(toDate)
    }

    // Get total count
    const total = await prisma.shipment.count({ where })

    // Get shipments
    const shipments = await prisma.shipment.findMany({
      where,
      include: {
        trackingEvents: {
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        packages: true
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    })

    // Log API call
    await prisma.apiLog.create({
      data: {
        apiKeyId: decoded.apiKeyId,
        method: 'GET',
        endpoint: '/partner/shipments',
        status: 200,
        responseTime: 120,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown'
      }
    })

    return NextResponse.json({
      data: shipments,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })
  } catch (error) {
    console.error('Get shipments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch shipments' },
      { status: 500 }
    )
  }
}

// POST /api/partner/shipments
// Create a new shipment for the partner company
export async function POST(request: NextRequest) {
  try {
    const decoded = await verifyPartnerToken(request)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check rate limit based on tier
    const apiLog = await prisma.apiLog.findMany({
      where: {
        apiKeyId: decoded.apiKeyId,
        createdAt: {
          gte: new Date(Date.now() - 60000) // Last minute
        }
      }
    })

    const tierLimits: Record<string, number> = {
      starter: 60,
      professional: 500,
      enterprise: 9999
    }

    if (apiLog.length >= (tierLimits[decoded.tier] || 100)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const {
      trackingNumber,
      customer,
      pickupLocation,
      dropoffLocation,
      packages,
      notes
    } = body

    // Validate required fields
    if (!trackingNumber || !customer || !packages || packages.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create shipment
    const shipment = await prisma.shipment.create({
      data: {
        trackingNumber,
        status: 'pending',
        companyId: decoded.companyId,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        pickupAddress: pickupLocation?.address,
        dropoffAddress: dropoffLocation?.address,
        notes,
        packages: {
          create: packages.map((pkg: any) => ({
            trackingNumber: pkg.trackingNumber || `PKG-${Date.now()}`,
            weight: pkg.weight,
            dimensions: pkg.dimensions,
            contents: pkg.contents
          }))
        },
        trackingEvents: {
          create: {
            status: 'pending',
            location: pickupLocation?.address || 'Origin',
            notes: 'Shipment created'
          }
        }
      },
      include: {
        packages: true,
        trackingEvents: true
      }
    })

    // Log API call
    await prisma.apiLog.create({
      data: {
        apiKeyId: decoded.apiKeyId,
        method: 'POST',
        endpoint: '/partner/shipments',
        status: 201,
        responseTime: 150,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown'
      }
    })

    return NextResponse.json(shipment, { status: 201 })
  } catch (error) {
    console.error('Create shipment error:', error)
    return NextResponse.json(
      { error: 'Failed to create shipment' },
      { status: 500 }
    )
  }
}
