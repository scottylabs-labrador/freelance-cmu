'use client'

import { useState } from 'react'
import DemoData from '@/components/DemoData'

export default function Home() {
  const [currentUser, setCurrentUser] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('')

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [ssn, setSsn] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [routingNumber, setRoutingNumber] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, fullName, address, city, state, zip, phone, dob, ssn, bankAccount, routingNumber
        })
      })

      const data = await response.json()

      if (response.ok) {
        setCurrentUser(email)
        setIsRegistered(true)
        setMessage(data.message || 'Registration successful!')
      } else {
        setMessage(data.error || 'Registration failed')
      }
    } catch (err) {
      setMessage('Registration failed')
    }
    
    setLoading(false)
  }

  const handleTransfer = async () => {
    try {
      const response = await fetch('/api/transfers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderEmail: currentUser,
          recipientEmail: recipient,
          amount: parseFloat(amount)
        })
      })

      const data = await response.json()
      setMessage(data.success ? data.message : data.error)
    } catch (err) {
      setMessage('Transfer failed')
    }
  }

  if (!isRegistered) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Register for Payments</h1>
          
          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-2">Already registered?</p>
            <button
              onClick={() => setShowLogin(true)}
              className="text-blue-600 underline text-sm"
            >
              Login with existing account
            </button>
          </div>
          
          {showLogin ? (
            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter your registered email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
              />
              <div className="space-x-2">
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/users/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: loginEmail })
                      })
                      const data = await response.json()
                      if (response.ok) {
                        setCurrentUser(loginEmail)
                        setIsRegistered(true)
                        setMessage('Login successful!')
                      } else {
                        setMessage(data.error || 'User not found')
                      }
                    } catch (err) {
                      setMessage('Login failed')
                    }
                  }}
                  disabled={!loginEmail}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowLogin(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Back to Register
                </button>
              </div>
            </div>
          ) : (
            <>
          <DemoData onFillDemo={(data) => {
            setEmail(data.email)
            setFullName(data.fullName)
            setAddress(data.address)
            setCity(data.city)
            setState(data.state)
            setZip(data.zip)
            setPhone(data.phone)
            setDob(data.dob)
            setSsn(data.ssn)
            setBankAccount(data.bankAccount)
            setRoutingNumber(data.routingNumber)
          }} />
          
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="ZIP"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last 4 digits of SSN"
              value={ssn}
              onChange={(e) => setSsn(e.target.value)}
              maxLength={4}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Bank Account Number"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Routing Number"
              value={routingNumber}
              onChange={(e) => setRoutingNumber(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
            </>
          )}

          {message && (
            <div className={`mt-4 p-3 rounded-lg ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Send Money</h1>
        <p className="text-center mb-6 text-gray-600">Logged in as: {currentUser}</p>
        
        <div className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="Recipient email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleTransfer}
          disabled={!recipient || !amount}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 mb-3"
        >
          Send ${amount} to {recipient}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3">Or choose another payment method:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setSelectedMethod('Zelle'); setShowConfirmation(true); }}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              Zelle
            </button>
            <button
              onClick={() => { setSelectedMethod('Venmo'); setShowConfirmation(true); }}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 text-sm"
            >
              Venmo
            </button>
            <button
              onClick={() => { setSelectedMethod('PayPal'); setShowConfirmation(true); }}
              className="bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 text-sm"
            >
              PayPal
            </button>
            <button
              onClick={() => { setSelectedMethod('Cash App'); setShowConfirmation(true); }}
              className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 text-sm"
            >
              Cash App
            </button>
          </div>
        </div>

        {showConfirmation && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border">
            <h3 className="font-semibold text-blue-800 mb-3">Payment Confirmation</h3>
            <p className="text-sm text-blue-700 mb-4">
              Please send ${amount} to {recipient} using {selectedMethod}, then confirm below:
            </p>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setMessage(`✅ Payment of $${amount} sent to ${recipient} via ${selectedMethod}`);
                  setShowConfirmation(false);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
              >
                Yes, I sent it
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className={`mt-4 p-3 rounded-lg ${message.includes('transferred') || message.includes('DEMO') || message.includes('REAL') || message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}