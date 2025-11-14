import fs from 'fs'
import path from 'path'

interface User {
  id: number
  email: string
  name: string
  stripe_account_id?: string
  bank_account?: string
  routing_number?: string
  is_demo?: boolean
}

const DB_FILE = path.join(process.cwd(), 'users.json')

const loadUsers = (): User[] => {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading users:', error)
  }
  return []
}

const saveUsers = (users: User[]) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error saving users:', error)
  }
}

let users = loadUsers()
let nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1

export const createUser = (email: string, name: string, stripeAccountId: string, bankAccount: string, routingNumber: string, isDemo: boolean = false): User => {
  const user: User = {
    id: nextId++,
    email,
    name,
    stripe_account_id: stripeAccountId,
    bank_account: bankAccount,
    routing_number: routingNumber,
    is_demo: isDemo
  }
  users.push(user)
  saveUsers(users)
  return user
}

export const getUserByEmail = (email: string): User | null => {
  return users.find(user => user.email === email) || null
}

