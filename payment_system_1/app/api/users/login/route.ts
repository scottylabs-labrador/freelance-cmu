import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const user = getUserByEmail(email)

    if (user) {
      return NextResponse.json({
        success: true,
        user: { id: user.id, email: user.email, name: user.name },
        message: 'Login successful!'
      })
    } else {
      return NextResponse.json(
        { error: 'User not found. Please register first.' },
        { status: 404 }
      )
    }

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}