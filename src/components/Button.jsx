import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, className, onClick }) => {
  const { setIsClicked, initialState } = useStateContext()

  const handleClick = () => {
    setIsClicked(initialState)
    onClick()
  }

  return (
    <button
      type='button'
      onClick={() => handleClick()}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor} ${className}`}
    >
      {icon} {text}
    </button>
  )
}

export default Button
