import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { ComponentPropsWithoutRef, createContext, FormEvent, ReactNode, useContext, useState } from 'react'
import delay from '../lib/delay'
import { transition } from '../pages'
import { CheckIcon } from './CheckIcon'
import Spinner from './Spinner'

const formContext = createContext({ status: 'idle' })

export function Form({
  onSubmit,
  afterSave,
  children,
  className,
  ...props
}: {
  onSubmit: () => Promise<void>
  afterSave: () => void
  children: ReactNode | ReactNode[]
  className: string
  props?: ComponentPropsWithoutRef<'form'>
}) {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    setStatus('saving')
    await onSubmit()
    setStatus('success')
    await delay(1250)
    afterSave()
  }

  return (
    <formContext.Provider value={{ status }}>
      <form
        onSubmit={handleSubmit}
        className={className}
        {...props}
      >
        <fieldset disabled={status !== 'idle'}>{children}</fieldset>
      </form>
    </formContext.Provider>
  )
}

Form.Button = function FormButton({ children, className, ...rest }: { children: ReactNode; className: string }) {
  let { status } = useContext(formContext)

  let disabled = status !== 'idle'

  return (
    <MotionConfig transition={{ ...transition, duration: 0.15 }}>
      <button
        type="submit"
        disabled={disabled}
        className={`${className} relative transition duration-200 ${
          disabled ? 'bg-opacity-80' : 'hover:bg-opacity-80'
        }`}
        {...rest}
      >
        <AnimatePresence mode="wait">
          {status === 'saving' && (
            <motion.div
              key="a"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex justify-center py-2"
            >
              <Spinner />
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="b"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex justify-center py-2"
            >
              <CheckIcon className="h-full" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className={status === 'idle' ? '' : 'invisible'}>{children}</span>
      </button>
    </MotionConfig>
  )
}
