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

    // Get user's notification preferences
    // For now, return default preferences
    // In production, store these in a NotificationPreference model
    const preferences = {
      shipmentUpdates: true,
      invoiceNotifications: true,
      weeklyReports: true,
      systemAlerts: true,
      marketingEmails: false
    }

    return NextResponse.json(preferences)
  } catch (error) {
    console.error('Get preferences error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
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

    const preferences = await request.json()

    // TODO: Save to database when NotificationPreference model is added
    // For now, just validate and return
    const validKeys = ['shipmentUpdates', 'invoiceNotifications', 'weeklyReports', 'systemAlerts', 'marketingEmails']
    const invalidKeys = Object.keys(preferences).filter(key => !validKeys.includes(key))

    if (invalidKeys.length > 0) {
      return NextResponse.json(
        { error: `Invalid preference keys: ${invalidKeys.join(', ')}` },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Preferences updated successfully', preferences },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update preferences error:', error)
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
}
