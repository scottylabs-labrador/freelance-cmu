import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createUser, getUserByEmail } from '@/lib/database'
import { isDemoData } from '@/lib/demoDetector'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      fullName,
      address,
      city,
      state,
      zip,
      phone,
      dob,
      ssn,
      bankAccount,
      routingNumber
    } = await request.json()

    console.log('Registration attempt for:', email)

    // Check if user already exists
    const existingUser = getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: 'User already registered' }, { status: 400 })
    }

    // Detect if this is demo data
    const isDemo = isDemoData(bankAccount, email)
    console.log('Demo mode detected:', isDemo)

    let accountId: string
    let message: string

    if (isDemo) {
      // Demo mode - create mock account
      accountId = 'demo_acct_' + Math.random().toString(36).substr(2, 9)
      message = 'Demo registration successful! (No real bank connection)'
    } else {
      // Real mode - create actual Stripe Connect account
      try {
        const account = await stripe.accounts.create({
          type: 'express',
          country: 'US',
          email: email,
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true }
          },
          business_type: 'individual',
          individual: {
            first_name: fullName.split(' ')[0],
            last_name: fullName.split(' ').slice(1).join(' '),
            email: email,
            phone: phone,
            dob: {
              day: parseInt(dob.split('-')[2]),
              month: parseInt(dob.split('-')[1]),
              year: parseInt(dob.split('-')[0])
            },
            ssn_last_4: ssn,
            address: {
              line1: address,
              city: city,
              state: state,
              postal_code: zip,
              country: 'US'
            }
          },
          external_account: {
            object: 'bank_account',
            country: 'US',
            currency: 'usd',
            account_number: bankAccount,
            routing_number: routingNumber
          }
        })
        
        accountId = account.id
        message = 'REAL registration successful! Stripe Connect account created.'
      } catch (stripeError: any) {
        console.error('Stripe account creation failed:', stripeError)
        return NextResponse.json(
          { error: `Stripe registration failed: ${stripeError.message}` },
          { status: 500 }
        )
      }
    }

    // Save user to memory
    const user = createUser(email, fullName, accountId, bankAccount, routingNumber, isDemo)
    
    console.log('User created successfully:', user.email, 'Demo:', isDemo)

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
      stripeAccountId: accountId,
      isDemo,
      message
    })

  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: `Registration failed: ${error.message}` },
      { status: 500 }
    )
  }
}