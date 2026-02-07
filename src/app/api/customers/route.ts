import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all customers for a company
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('companyId')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    if (!companyId) {
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      )
    }

    // Build query
    const where: any = { companyId }
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Get customers with shipment count
    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          _count: {
            select: { shipments: true },
          },
          shipments: {
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              trackingNumber: true,
              status: true,
              createdAt: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.customer.count({ where }),
    ])

    return NextResponse.json({
      customers,
      total,
      hasMore: offset + limit < total,
    })
  } catch (error) {
    console.error('Customers fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}

// CREATE new customer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      companyId,
      firstName,
      lastName,
      email,
      phone,
      company,
      address,
      city,
      state,
      postalCode,
      country,
      portalAccess,
      portalPassword,
    } = body

    // Validate required fields
    if (!companyId || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if customer email already exists for this company
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        companyId,
        email,
      },
    })

    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Customer with this email already exists' },
        { status: 409 }
      )
    }

    // Create customer
    const customer = await prisma.customer.create({
      data: {
        companyId,
        firstName,
        lastName,
        email,
        phone,
        company,
        address,
        city,
        state,
        postalCode,
        country,
        portalAccess: portalAccess || false,
        portalPassword: portalPassword || null, // Should be hashed in production
      },
    })

    // Create welcome notification
    await prisma.notification.create({
      data: {
        userId: customer.id,
        companyId,
        type: 'SYSTEM',
        title: 'Welcome to FastForward',
        message: `Hi ${firstName}, your customer account has been created. You can now track your shipments.`,
        channel: 'EMAIL',
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: customer.id,
        companyId,
        action: 'customer.created',
        description: `Customer ${firstName} ${lastName} was created`,
        metadata: {
          customerId: customer.id,
          email: customer.email,
        },
      },
    })

    return NextResponse.json({ customer }, { status: 201 })
  } catch (error) {
    console.error('Customer creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    )
  }
}
