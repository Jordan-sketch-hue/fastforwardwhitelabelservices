import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

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

    const { name, phone, department, bio, profilePicture } = await request.json()

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(department && { department }),
        ...(bio && { bio }),
        ...(profilePicture && { profilePicture })
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        department: true,
        bio: true,
        profilePicture: true,
        role: true
      }
    })

    return NextResponse.json(
      { message: 'Profile updated successfully', user: updated },
      { status: 200 }
    )
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
