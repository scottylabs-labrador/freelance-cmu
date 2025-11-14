import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getUserByEmail } from '@/lib/database'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function POST(request: NextRequest) {
  try {
    const { senderEmail, recipientEmail, amount } = await request.json()

    console.log('Transfer attempt:', { senderEmail, recipientEmail, amount })

    // Get sender and recipient from database
    const sender = getUserByEmail(senderEmail)
    const recipient = getUserByEmail(recipientEmail)

    console.log('Sender found:', sender ? sender.name : 'NOT FOUND')
    console.log('Recipient found:', recipient ? recipient.name : 'NOT FOUND')

    if (!sender) {
      return NextResponse.json(
        { error: `Sender ${senderEmail} not found. Please register first.` },
        { status: 400 }
      )
    }

    if (!recipient) {
      return NextResponse.json(
        { error: `Recipient ${recipientEmail} not found. They must register first.` },
        { status: 400 }
      )
    }

    // Check if either user is in demo mode
    const isDemoTransfer = sender.is_demo || recipient.is_demo
    console.log('Demo transfer detected:', isDemoTransfer)

    let transferId: string
    let message: string

    if (isDemoTransfer) {
      // Demo mode - simulate transfer
      transferId = 'demo_transfer_' + Math.random().toString(36).substr(2, 9)
      message = `DEMO: $${amount} transferred from ${sender.name} to ${recipient.name} (no real money moved)`
    } else {
      // Real mode - actual Stripe transfer
      try {
        const transfer = await stripe.transfers.create({
          amount: amount * 100, // Convert to cents
          currency: 'usd',
          destination: recipient.stripe_account_id!,
          metadata: {
            sender_email: senderEmail,
            recipient_email: recipientEmail
          }
        })
        
        transferId = transfer.id
        message = `REAL: $${amount} transferred from ${sender.name} to ${recipient.name} - Check your Stripe dashboard!`
      } catch (stripeError: any) {
        console.error('Stripe transfer failed:', stripeError)
        return NextResponse.json(
          { error: `Transfer failed: ${stripeError.message}` },
          { status: 500 }
        )
      }
    }

    console.log('Transfer completed:', transferId, 'Demo:', isDemoTransfer)

    return NextResponse.json({
      success: true,
      transferId,
      isDemo: isDemoTransfer,
      message
    })

  } catch (error: any) {
    console.error('Transfer error:', error)
    return NextResponse.json(
      { error: error.message || 'Transfer failed' },
      { status: 500 }
    )
  }
}