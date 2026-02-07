import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

// List team members
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

    const teamMembers = await prisma.user.findMany({
      where: {
        companyId: user.companyId
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        profilePicture: true,
        createdAt: true,
        emailVerified: true
      },
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error('Get team members error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

// Remove team member
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!currentUser?.companyId) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 400 }
      )
    }

    // Only admins can remove team members
    if (currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can remove team members' },
        { status: 403 }
      )
    }

    const { memberId } = await request.json()

    if (!memberId) {
      return NextResponse.json(
        { error: 'Member ID is required' },
        { status: 400 }
      )
    }

    const memberToRemove = await prisma.user.findFirst({
      where: {
        id: memberId,
        companyId: currentUser.companyId
      }
    })

    if (!memberToRemove) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    // Cannot remove yourself
    if (memberToRemove.id === currentUser.id) {
      return NextResponse.json(
        { error: 'Cannot remove yourself from the team' },
        { status: 400 }
      )
    }

    // Remove team member
    await prisma.user.update({
      where: { id: memberId },
      data: {
        companyId: null
      }
    })

    return NextResponse.json(
      { message: 'Team member removed successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Remove team member error:', error)
    return NextResponse.json(
      { error: 'Failed to remove team member' },
      { status: 500 }
    )
  }
}

// Update team member role
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!currentUser?.companyId) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 400 }
      )
    }

    // Only admins can update roles
    if (currentUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can update team member roles' },
        { status: 403 }
      )
    }

    const { memberId, role } = await request.json()

    if (!memberId || !role) {
      return NextResponse.json(
        { error: 'Member ID and role are required' },
        { status: 400 }
      )
    }

    const validRoles = ['admin', 'manager', 'staff']
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    const member = await prisma.user.findFirst({
      where: {
        id: memberId,
        companyId: currentUser.companyId
      }
    })

    if (!member) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    const updated = await prisma.user.update({
      where: { id: memberId },
      data: { role }
    })

    return NextResponse.json(
      { message: 'Role updated successfully', user: updated },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update team member error:', error)
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}
