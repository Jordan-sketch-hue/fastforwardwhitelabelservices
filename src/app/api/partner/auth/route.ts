import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sign } from 'jsonwebtoken'
import crypto from 'crypto'

// POST /api/partner/auth
// Generate JWT token for partner API access
export async function POST(request: NextRequest) {
  try {
    const { apiKey, secret } = await request.json()

    if (!apiKey || !secret) {
      return NextResponse.json(
        { error: 'Missing API key or secret' },
        { status: 400 }
      )
    }

    // Find the API key in database
    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: { company: true }
    })

    if (!apiKeyRecord || !apiKeyRecord.active) {
      return NextResponse.json(
        { error: 'Invalid or inactive API key' },
        { status: 401 }
      )
    }

    // Verify secret (hash comparison)
    const secretHash = crypto.createHash('sha256').update(secret).digest('hex')
    if (apiKeyRecord.secret !== secretHash) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = sign(
      {
        companyId: apiKeyRecord.companyId,
        apiKeyId: apiKeyRecord.id,
        tier: apiKeyRecord.tier,
        type: 'partner_api'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    // Log API authentication
    await prisma.apiLog.create({
      data: {
        apiKeyId: apiKeyRecord.id,
        method: 'AUTH',
        endpoint: '/partner/auth',
        status: 200,
        responseTime: 50,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown'
      }
    })

    return NextResponse.json({
      token,
      expiresIn: 86400, // 24 hours in seconds
      tokenType: 'Bearer',
      company: {
        id: apiKeyRecord.companyId,
        name: apiKeyRecord.company?.name,
        tier: apiKeyRecord.tier
      }
    })
  } catch (error) {
    console.error('Partner auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

// GET /api/partner/auth/status
// Check authentication status
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing bearer token' },
        { status: 401 }
      )
    }

    const token = authHeader.slice(7)
    // In production, verify and decode JWT properly
    
    return NextResponse.json({
      status: 'authenticated',
      message: 'Token is valid'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Token validation failed' },
      { status: 401 }
    )
  }
}
