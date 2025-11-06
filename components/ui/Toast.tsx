'use client'

import {createContext, useContext, useState, useCallback, ReactNode} from 'react'

type ToastType = 'success' | 'error' | 'info'

type Toast = {
  id: string
  message: string
  type: ToastType
}

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export function ToastProvider({children}: {children: ReactNode}) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(7)
    const newToast = {id, message, type}

    setToasts((prev) => [...prev, newToast])

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto animate-slide-in-right"
            style={{
              animation: 'slide-in-right 0.3s ease-out'
            }}
          >
            <div
              className={`min-w-[300px] max-w-md px-6 py-4 shadow-2xl border-2 flex items-center gap-4 ${
                toast.type === 'success'
                  ? 'bg-surface-elevated border-accent-primary text-text-primary'
                  : toast.type === 'error'
                  ? 'bg-surface-elevated border-accent-red text-text-primary'
                  : 'bg-surface-elevated border-border text-text-primary'
              }`}
            >
              {/* Icon */}
              {toast.type === 'success' && (
                <svg
                  className="w-6 h-6 flex-shrink-0 text-accent-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg
                  className="w-6 h-6 flex-shrink-0 text-accent-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              )}

              {/* Message */}
              <p className="font-bold uppercase tracking-wide text-sm flex-1">{toast.message}</p>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-border overflow-hidden">
                <div
                  className={`h-full ${
                    toast.type === 'success' ? 'bg-accent-primary' : 'bg-accent-red'
                  }`}
                  style={{
                    animation: 'shrink 3s linear forwards'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </ToastContext.Provider>
  )
}
