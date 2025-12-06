# User-to-User Payment System

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add your Stripe keys to `.env.local`:
```
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
```

3. Run the development server:
```bash
npm run dev
```

## Features

- Bank-to-bank transfers between users
- ACH bank transfer integration via Stripe
- TypeScript for type safety
- Tailwind CSS for styling
- Responsive design

## Usage

1. Enter recipient email and amount
2. Fill in bank account and routing number
3. Click "Transfer" to process

The system creates ACH bank transfers through Stripe for secure bank-to-bank payments.