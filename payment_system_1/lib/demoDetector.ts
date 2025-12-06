const DEMO_ACCOUNTS = [
  '000123456789',
  '000987654321', 
  '000555666777'
]

const DEMO_EMAILS = [
  'john@demo.com',
  'jane@demo.com'
]

export const isDemoData = (bankAccount: string, email: string): boolean => {
  return DEMO_ACCOUNTS.includes(bankAccount) || DEMO_EMAILS.includes(email)
}

export const isDemoUser = (email: string): boolean => {
  return DEMO_EMAILS.includes(email)
}