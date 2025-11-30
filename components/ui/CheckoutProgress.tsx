'use client'

import {Check} from 'lucide-react'
import {motion} from 'framer-motion'

interface CheckoutProgressProps {
  currentStep: number
  steps?: Array<{
    label: string
    description?: string
  }>
}

const defaultSteps = [
  {label: 'Cart', description: 'Review items'},
  {label: 'Information', description: 'Contact & shipping'},
  {label: 'Payment', description: 'Complete order'},
]

export function CheckoutProgress({currentStep, steps = defaultSteps}: CheckoutProgressProps) {
  return (
    <div className="w-full py-4">
      {/* Desktop version */}
      <div className="hidden md:flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isLast = index === steps.length - 1

          return (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                      backgroundColor: isCompleted || isCurrent
                        ? 'rgb(212, 175, 55)'
                        : 'rgb(38, 38, 46)',
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCompleted || isCurrent
                        ? 'border-accent-primary'
                        : 'border-border'
                    }`}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{type: 'spring', damping: 15}}
                      >
                        <Check className="w-5 h-5 text-black" />
                      </motion.div>
                    ) : (
                      <span
                        className={`text-sm font-bold ${
                          isCurrent ? 'text-black' : 'text-text-muted'
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </motion.div>
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-sm font-medium ${
                      isCompleted || isCurrent ? 'text-white' : 'text-text-muted'
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-text-muted mt-0.5">{step.description}</p>
                  )}
                </div>
              </div>

              {!isLast && (
                <div className="w-24 mx-4 mt-[-24px]">
                  <div className="h-0.5 bg-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent-primary"
                      initial={{width: 0}}
                      animate={{
                        width: isCompleted ? '100%' : '0%',
                      }}
                      transition={{duration: 0.3, ease: 'easeInOut'}}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile version - more compact */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep

            return (
              <div key={step.label} className="flex flex-col items-center flex-1">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.15 : 1,
                    backgroundColor: isCompleted || isCurrent
                      ? 'rgb(212, 175, 55)'
                      : 'rgb(38, 38, 46)',
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    isCompleted || isCurrent ? 'border-accent-primary' : 'border-border'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-black" />
                  ) : (
                    <span
                      className={`text-xs font-bold ${
                        isCurrent ? 'text-black' : 'text-text-muted'
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </motion.div>
                <p
                  className={`text-xs mt-1 ${
                    isCompleted || isCurrent ? 'text-white' : 'text-text-muted'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            )
          })}
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-border rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-accent-primary"
            initial={{width: 0}}
            animate={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
            transition={{duration: 0.3}}
          />
        </div>
      </div>
    </div>
  )
}
