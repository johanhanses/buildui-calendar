import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths
} from 'date-fns'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useState } from 'react'
import ResizablePanel from '../components/ResizablePanel'

const variants = {
  enter: (direction: 1 | -1) => ({
    x: `${100 * direction}%`,
    opacity: 0
  }),
  middle: { x: '0%', opacity: 1 },
  exit: (direction: 1 | -1) => ({ x: `${-100 * direction}%`, opacity: 0 })
}

const removeImmediately = { exit: { visibility: 'hidden' } }

export default function Page() {
  const [monthString, setMonthString] = useState(format(new Date(), 'yyyy-MM'))
  const month = parse(monthString, 'yyyy-MM', new Date())
  const [direction, setDirection] = useState<1 | -1>()
  const [isAnimating, setIsAnimating] = useState(false)

  function nextMonth() {
    if (isAnimating) return
    setIsAnimating(true)
    const next = addMonths(month, 1)
    setDirection(1)
    setMonthString(format(next, 'yyyy-MM'))
  }

  function previousMonth() {
    if (isAnimating) return
    setIsAnimating(true)
    const previous = subMonths(month, 1)
    setDirection(-1)
    setMonthString(format(previous, 'yyyy-MM'))
  }

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month))
  })

  return (
    <MotionConfig transition={{ duration: 0.5 }}>
      <div className="flex min-h-screen items-start bg-stone-800 p-6 pt-16 text-stone-900">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white">
          <div className="py-8">
            <div className="flex flex-col justify-center rounded text-center">
              <ResizablePanel>
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                  onExitComplete={() => setIsAnimating(false)}
                >
                  <motion.div
                    key={monthString}
                    initial="enter"
                    animate="middle"
                    exit="exit"
                  >
                    <header className="relative flex justify-between px-8">
                      <motion.button
                        // @ts-ignore
                        variants={removeImmediately}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={previousMonth}
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </motion.button>
                      <motion.p
                        custom={direction}
                        variants={variants}
                        className="absolute inset-0 flex items-center justify-center font-semibold"
                      >
                        {format(month, 'MMMM yyyy')}
                      </motion.p>
                      <motion.button
                        // @ts-ignore
                        variants={removeImmediately}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={nextMonth}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </motion.button>
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, white 15%, transparent 30%, transparent 70%, white 85%)'
                        }}
                      />
                    </header>

                    <motion.div
                      // @ts-ignore
                      variants={removeImmediately}
                      className="mt-6 grid grid-cols-7 gap-y-6 px-8"
                    >
                      <span className="font-medium text-stone-500">Su</span>
                      <span className="font-medium text-stone-500">Mo</span>
                      <span className="font-medium text-stone-500">Tu</span>
                      <span className="font-medium text-stone-500">We</span>
                      <span className="font-medium text-stone-500">Th</span>
                      <span className="font-medium text-stone-500">Fr</span>
                      <span className="font-medium text-stone-500">Sa</span>
                    </motion.div>
                    <motion.div
                      custom={direction}
                      variants={variants}
                      className="mt-6 grid grid-cols-7 gap-y-6 px-8"
                    >
                      {days.map((day) => (
                        <span
                          key={format(day, 'yyyy-MM-dd')}
                          className={`${
                            isSameMonth(day, month) ? '' : 'text-stone-300'
                          } font-semibold`}
                        >
                          {format(day, 'd')}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
