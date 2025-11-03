'use client'

import {useState, FormEvent} from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Successfully subscribed!')
        setEmail('') // Clear the input
      } else {
        setStatus('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again later.')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === 'loading'}
          className="flex-1 px-6 py-4 rounded-lg bg-background/50 border-2 border-accent-primary/30 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder:text-text-muted disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Joining...' : 'Join the List'}
        </button>
      </form>

      {/* Status Messages */}
      {message && (
        <div className={`mt-4 text-center ${
          status === 'success' ? 'text-accent-primary' : 'text-red-400'
        }`}>
          {message}
        </div>
      )}

      <p className="text-sm text-text-muted mt-4 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  )
}
