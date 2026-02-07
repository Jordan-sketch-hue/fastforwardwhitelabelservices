import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: customerId } = await params

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        shipments: {
          orderBy: { createdAt: 'desc' },
          include: {
            trackingEvents: {
              orderBy: { timestamp: 'desc' },
              take: 1,
            },
            packages: true,
          },
        },
        _count: {
          select: { shipments: true },
        },
      },
    })

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ customer })
  } catch (error) {
    console.error('Customer fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customer' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: customerId } = await params
    const body = await request.json()

    const customer = await prisma.customer.update({
      where: { id: customerId },
      data: body,
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: customer.id,
        companyId: customer.companyId,
        action: 'customer.updated',
        description: `Customer ${customer.firstName} ${customer.lastName} was updated`,
        metadata: {
          customerId: customer.id,
          changes: body,
        },
      },
    })

    return NextResponse.json({ customer })
  } catch (error) {
    console.error('Customer update error:', error)
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: customerId } = await params

    // Check if customer has shipments
    const shipmentCount = await prisma.shipment.count({
      where: { customerId },
    })

    if (shipmentCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete customer with existing shipments' },
        { status: 400 }
      )
    }

    const customer = await prisma.customer.delete({
      where: { id: customerId },
    })

    return NextResponse.json({ success: true, customer })
  } catch (error) {
    console.error('Customer deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete customer' },
      { status: 500 }
    )
  }
}
