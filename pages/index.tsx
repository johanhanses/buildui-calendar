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

export default function Page() {
  const [monthString, setMonthString] = useState(format(new Date(), 'yyyy-MM'))
  const month = parse(monthString, 'yyyy-MM', new Date())

  function nextMonth() {
    const next = addMonths(month, 1)
    setMonthString(format(next, 'yyyy-MM'))
  }

  function previousMonth() {
    const previous = subMonths(month, 1)
    setMonthString(format(previous, 'yyyy-MM'))
  }

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month))
  })

  return (
    <MotionConfig transition={{ duration: 1 }}>
      <div className="flex min-h-screen items-start bg-stone-800 pt-16 text-stone-900">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white">
          <div className="py-8">
            <div className="flex flex-col justify-center rounded text-center">
              <AnimatePresence
                mode="popLayout"
                initial={false}
              >
                <motion.div
                  key={monthString}
                  initial="enter"
                  animate="middle"
                  exit="exit"
                >
                  <header className="relative flex justify-between px-8">
                    <button
                      className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                      onClick={previousMonth}
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </button>
                    <motion.p
                      variants={{
                        enter: { x: '100%' },
                        middle: { x: '0%' },
                        exit: { x: '-100%' }
                      }}
                      className="absolute inset-0 flex items-center justify-center font-semibold"
                    >
                      {format(month, 'MMMM yyyy')}
                    </motion.p>
                    <button
                      className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                      onClick={nextMonth}
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </header>
                  <div className="mt-6 grid grid-cols-7 gap-y-6 px-8">
                    <span className="font-medium text-stone-500">Su</span>
                    <span className="font-medium text-stone-500">Mo</span>
                    <span className="font-medium text-stone-500">Tu</span>
                    <span className="font-medium text-stone-500">We</span>
                    <span className="font-medium text-stone-500">Th</span>
                    <span className="font-medium text-stone-500">Fr</span>
                    <span className="font-medium text-stone-500">Sa</span>

                    {days.map((day) => (
                      <span
                        key={format(day, 'yyyy-MM-dd')}
                        className={`${isSameMonth(day, month) ? '' : 'text-stone-300'} font-semibold`}
                      >
                        {format(day, 'd')}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
