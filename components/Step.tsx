import { motion } from 'framer-motion'
import { CheckIcon } from './CheckIcon'

export function Step({ step, currentStep }: { step: number; currentStep: number }) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete'

  return (
    <div className="relative">
      <motion.div
        animate={status}
        variants={{
          active: {
            scale: 1,
            transition: {
              delay: 0,
              duration: 0.2
            }
          },
          complete: { scale: 1.25 }
        }}
        transition={{ duration: 0.6, delay: 0.2, type: 'tween', ease: 'circOut' }}
        className="absolute inset-0 rounded-full bg-blue-200"
      ></motion.div>
      <motion.div
        initial={false}
        animate={status}
        variants={{
          inactive: {
            backgroundColor: 'var(--white)',
            borderColor: 'var(--slate-200)',
            color: 'var(--slate-400)'
          },
          active: {
            backgroundColor: 'var(--white)',
            borderColor: 'var(--blue-500)',
            color: 'var(--blue-500)'
          },
          complete: {
            backgroundColor: 'var(--blue-500)',
            borderColor: 'var(--blue-500)',
            color: 'var(--blue-500)'
          }
        }}
        transition={{ duration: 0.2 }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold"
      >
        <div className="flex items-center justify-center">
          {status === 'complete' ? <CheckIcon className="h-6 w-6 text-white" /> : <span>{step}</span>}
        </div>
      </motion.div>
    </div>
  )
}
