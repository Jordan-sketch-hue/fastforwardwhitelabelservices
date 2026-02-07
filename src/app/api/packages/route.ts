import { NextRequest, NextResponse } from 'next/server'

// Mock packages database
const packages: Record<string, any> = {}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const trackingNumber = searchParams.get('tracking')
    const status = searchParams.get('status')

    let results = Object.values(packages)

    if (trackingNumber) {
      results = results.filter(p => p.trackingNumber.includes(trackingNumber))
    }

    if (status) {
      results = results.filter(p => p.status === status)
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      packages: results,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.trackingNumber || !body.destination) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const packageId = Date.now().toString()
    const newPackage = {
      id: packageId,
      trackingNumber: body.trackingNumber,
      origin: body.origin || 'Warehouse',
      destination: body.destination,
      weight: body.weight || 0,
      status: 'created',
      createdAt: new Date(),
      updatedAt: new Date(),
      events: [
        {
          status: 'created',
          timestamp: new Date(),
          location: body.origin || 'Warehouse',
          description: 'Package created',
        },
      ],
    }

    packages[packageId] = newPackage

    return NextResponse.json(
      { success: true, package: newPackage },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    )
  }
}
