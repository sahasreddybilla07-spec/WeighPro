import { useEffect, useRef, useState } from 'react'

const EASE_OUT_EXPO = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

export function useCountUp(target: number, durationMs = 1200, delayMs = 0): number {
  const [value, setValue] = useState(0)
  const frameRef = useRef<number>()

  useEffect(() => {
    let startTime: number | null = null
    let cancelled = false

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (cancelled) return
        if (startTime === null) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / durationMs, 1)
        setValue(Math.round(target * EASE_OUT_EXPO(progress)))
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step)
        }
      }
      frameRef.current = requestAnimationFrame(step)
    }, delayMs)

    return () => {
      cancelled = true
      clearTimeout(timeout)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, durationMs, delayMs])

  return value
}
