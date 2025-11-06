'use client'

import {useState} from 'react'

type PromoCodeInputProps = {
  cartTotal: number
  onApply: (discountCents: number, code: string, description?: string) => void
  onRemove: () => void
  currentCode?: string
}

export function PromoCodeInput({cartTotal, onApply, onRemove, currentCode}: PromoCodeInputProps) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code.trim()) {
      setError('Please enter a promo code')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/promo-code', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          code: code.trim(),
          cartTotal,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Invalid promo code')
        return
      }

      if (data.success) {
        onApply(data.discountCents, data.code, data.description)
        setCode('')
        setError('')
      }
    } catch (err) {
      setError('Failed to apply promo code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = () => {
    onRemove()
    setCode('')
    setError('')
  }

  if (currentCode) {
    return (
      <div className="bg-background/50 border border-accent-primary/30 p-4 rounded">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-accent-primary font-bold mb-1">
              Promo Code Applied
            </div>
            <div className="font-bold text-text-primary">{currentCode}</div>
          </div>
          <button
            onClick={handleRemove}
            className="text-xs text-accent-red hover:text-red-400 uppercase tracking-wide font-bold transition-colors"
            aria-label="Remove promo code"
          >
            Remove
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="promo-code" className="block text-xs uppercase tracking-wider text-text-secondary font-bold mb-2">
          Have a Promo Code?
        </label>
        <div className="flex gap-2">
          <input
            id="promo-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="ENTER CODE"
            className="flex-1 bg-background border border-border px-4 py-2 text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none transition-colors uppercase text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="px-6 py-2 bg-accent-primary text-black font-bold uppercase tracking-wide text-sm hover:bg-accent-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Applying...' : 'Apply'}
          </button>
        </div>
      </div>

      {error && (
        <div className="text-accent-red text-sm" role="alert">
          {error}
        </div>
      )}
    </form>
  )
}
