import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import crypto from 'crypto'

// Send team invitation
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { email, role } = await request.json()

    if (!email || !role) {
      return NextResponse.json(
        { error: 'Email and role are required' },
        { status: 400 }
      )
    }

    const invitingUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { company: true }
    })

    if (!invitingUser || !invitingUser.companyId) {
      return NextResponse.json(
        { error: 'User or company not found' },
        { status: 400 }
      )
    }

    // Check if user already exists in company
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        companyId: invitingUser.companyId
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists in your company' },
        { status: 400 }
      )
    }

    // Generate invitation token
    const invitationToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 604800000) // 7 days

    const invitation = await prisma.teamInvitation.create({
      data: {
        email,
        role,
        token: invitationToken,
        status: 'pending',
        expiresAt,
        companyId: invitingUser.companyId,
        invitedById: invitingUser.id
      }
    })

    // TODO: Send invitation email
    // const invitationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/accept-invitation?token=${invitationToken}`
    // await sendInvitationEmail(email, invitationLink)

    return NextResponse.json(
      { message: 'Invitation sent successfully', invitation },
      { status: 201 }
    )
  } catch (error) {
    console.error('Team invitation error:', error)
    return NextResponse.json(
      { error: 'Failed to send invitation' },
      { status: 500 }
    )
  }
}

// List pending invitations
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

    if (!user?.companyId) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 400 }
      )
    }

    const invitations = await prisma.teamInvitation.findMany({
      where: {
        companyId: user.companyId
      },
      include: {
        invitedByUser: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(invitations)
  } catch (error) {
    console.error('Get invitations error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invitations' },
      { status: 500 }
    )
  }
}
