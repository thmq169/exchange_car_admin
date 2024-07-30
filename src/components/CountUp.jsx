// src/CountUp.jsx
import React, { useState, useEffect } from 'react'

const CountUp = ({ start = 0, end, duration = 800 }) => {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTime
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * (end - start) + start))
      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }
    requestAnimationFrame(updateCount)
  }, [start, end, duration])

  return <span>{count}</span>
}

export default CountUp
