import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const { searchParams } = new URL(request.url)
    const dateRange = searchParams.get('dateRange') || '7days'
    const platform = searchParams.get('platform') || 'all'

    // Calculate date range
    let startDate = new Date()
    switch (dateRange) {
      case '7days':
        startDate.setDate(startDate.getDate() - 7)
        break
      case '30days':
        startDate.setDate(startDate.getDate() - 30)
        break
      case '90days':
        startDate.setDate(startDate.getDate() - 90)
        break
      case 'ytd':
        startDate = new Date(new Date().getFullYear(), 0, 1)
        break
    }

    // Get shipments for user's company
    const shipments = await prisma.shipment.findMany({
      where: {
        company: {
          users: {
            some: {
              id: user.id
            }
          }
        },
        createdAt: {
          gte: startDate
        }
      },
      include: {
        trackingEvents: true,
        invoice: true
      }
    })

    // Calculate metrics
    const totalShipments = shipments.length
    const deliveredShipments = shipments.filter((s: any) => s.status === 'delivered').length
    const inTransitShipments = shipments.filter((s: any) => s.status === 'in-transit').length
    const pendingShipments = shipments.filter((s: any) => s.status === 'pending').length
    const returnedShipments = shipments.filter((s: any) => s.status === 'returned').length

    const totalRevenue = shipments.reduce((sum: number, s: any) => sum + (s.revenue || 0), 0)
    const totalCost = shipments.reduce((sum: number, s: any) => sum + (s.cost || 0), 0)

    // Calculate average delivery time
    const deliveredShipmentsWithTime = shipments
      .filter((s: any) => s.status === 'delivered' && s.deliveredAt)
      .map((s: any) => {
        const createdDate = new Date(s.createdAt)
        const deliveredDate = new Date(s.deliveredAt!)
        return (deliveredDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
      })

    const averageDeliveryTime = deliveredShipmentsWithTime.length > 0
      ? (deliveredShipmentsWithTime.reduce((a: number, b: number) => a + b, 0) / deliveredShipmentsWithTime.length).toFixed(1)
      : 0

    // Get 7-day trend data
    const trendData = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)

      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)

      const dayShipments = shipments.filter(
        (s: any) => new Date(s.createdAt) >= date && new Date(s.createdAt) < nextDate
      )

      const dayRevenue = dayShipments.reduce((sum: number, s: any) => sum + (s.revenue || 0), 0)

      trendData.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        shipments: dayShipments.length,
        revenue: dayRevenue
      })
    }

    // Get top routes
    const routeMap: Record<string, { count: number; revenue: number }> = {}
    shipments.forEach((s: any) => {
      const route = `${s.origin}→${s.destination}`
      if (!routeMap[route]) {
        routeMap[route] = { count: 0, revenue: 0 }
      }
      routeMap[route].count++
      routeMap[route].revenue += s.revenue || 0
    })

    const topRoutes = Object.entries(routeMap)
      .map(([route, data]) => ({
        route,
        shipments: data.count,
        revenue: data.revenue
      }))
      .sort((a, b) => b.shipments - a.shipments)
      .slice(0, 4)

    // Get analytics events for satisfaction (if available)
    const analyticsEvents = await prisma.analyticsEvent.findMany({
      where: {
        userId: user.id,
        eventType: 'satisfaction_rating',
        createdAt: { gte: startDate }
      }
    })

    const satisfactionRatings = analyticsEvents
      .map((e: any) => parseFloat(e.data as string) || 0)
      .filter((r: number) => r > 0)

    const averageSatisfaction = satisfactionRatings.length > 0
      ? (satisfactionRatings.reduce((a: number, b: number) => a + b, 0) / satisfactionRatings.length).toFixed(1)
      : 4.8

    return NextResponse.json({
      metrics: {
        totalShipments,
        totalRevenue: totalRevenue.toFixed(2),
        averageDeliveryTime,
        satisfactionRating: averageSatisfaction
      },
      breakdown: {
        delivered: deliveredShipments,
        inTransit: inTransitShipments,
        pending: pendingShipments,
        returned: returnedShipments
      },
      trends: trendData,
      topRoutes,
      summary: {
        totalCost: totalCost.toFixed(2),
        profit: (totalRevenue - totalCost).toFixed(2),
        profitMargin: totalRevenue > 0 
          ? (((totalRevenue - totalCost) / totalRevenue) * 100).toFixed(1)
          : 0
      }
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
