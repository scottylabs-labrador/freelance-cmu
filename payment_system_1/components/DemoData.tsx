'use client'

interface DemoDataProps {
  onFillDemo: (data: any) => void
}

export default function DemoData({ onFillDemo }: DemoDataProps) {
  const demoUser1 = {
    email: 'john@demo.com',
    fullName: 'John Doe',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    phone: '555-0123',
    dob: '1990-01-15',
    ssn: '1234',
    bankAccount: '000123456789',
    routingNumber: '110000000'
  }

  const demoUser2 = {
    email: 'jane@demo.com',
    fullName: 'Jane Smith',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90210',
    phone: '555-0456',
    dob: '1985-05-20',
    ssn: '5678',
    bankAccount: '000987654321',
    routingNumber: '121000248'
  }

  return (
    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
      <p className="text-sm text-blue-800 mb-3">Quick Demo Fill:</p>
      <div className="space-x-2">
        <button
          type="button"
          onClick={() => onFillDemo(demoUser1)}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Fill as John Doe
        </button>
        <button
          type="button"
          onClick={() => onFillDemo(demoUser2)}
          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
        >
          Fill as Jane Smith
        </button>
      </div>
    </div>
  )
}