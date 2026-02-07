import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Mock database (in production, use actual database)
const users: Record<string, any> = {}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.email || !body.password || !body.firstName || !body.lastName || !body.companyName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    if (users[body.email]) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Generate API key for the user
    const apiKey = crypto.randomBytes(32).toString('hex')
    const accountId = crypto.randomBytes(12).toString('hex')

    // Store user (in production, hash password and use database)
    users[body.email] = {
      id: accountId,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      companyName: body.companyName,
      phone: body.phone,
      industry: body.industry,
      packageVolume: body.packageVolume,
      businessType: body.businessType,
      plan: body.plan,
      apiKey: apiKey,
      apiSecret: crypto.randomBytes(32).toString('hex'),
      createdAt: new Date(),
      status: 'active',
    }

    // In production, send confirmation email with API keys
    // For now, we'll return success response

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: accountId,
          email: body.email,
          companyName: body.companyName,
          plan: body.plan,
        },
        apiKey: apiKey, // In production, send via email only
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
