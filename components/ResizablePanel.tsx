import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import useMeasure from 'react-use-measure'

export default function ResizablePanel({ children }: { children: ReactNode }) {
  const [ref, bounds] = useMeasure()

  return (
    <motion.div animate={{ height: bounds.height > 0 ? bounds.height : 0 }}>
      <div ref={ref}>{children}</div>
    </motion.div>
  )
}
