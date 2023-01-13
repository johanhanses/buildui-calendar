import { useMotionValue, useScroll, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { clamp } from '../lib/clamp'

export function useBoundedScroll(bounds: number) {
  const { scrollY } = useScroll()
  const scrollYBounded = useMotionValue(0)
  const scrollYBoundedProgress = useTransform(scrollYBounded, [0, bounds], [0, 1])

  useEffect(() => {
    return scrollY.onChange((current) => {
      const diff = current - scrollY.getPrevious()
      const newScrollYBounded = scrollYBounded.get() + diff

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds))
    })
  }, [bounds, scrollY, scrollYBounded])

  return { scrollYBounded, scrollYBoundedProgress }
}
