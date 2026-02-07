import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

// Send password reset email
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if email exists for security
      return NextResponse.json(
        { message: 'If an account exists with this email, a reset link will be sent' },
        { status: 200 }
      )
    }

    // Generate reset token (32 bytes = 64 hex characters)
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex')
    const expiresAt = new Date(Date.now() + 3600000) // 1 hour from now

    // Save hashed token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetTokenHash,
        passwordResetExpires: expiresAt
      }
    })

    // TODO: Send email with reset link
    // const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${resetToken}`
    // await sendPasswordResetEmail(email, resetLink)

    return NextResponse.json(
      { message: 'If an account exists with this email, a reset link will be sent' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Failed to process password reset' },
      { status: 500 }
    )
  }
}
