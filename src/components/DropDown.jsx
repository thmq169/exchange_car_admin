import React, { useEffect, useState } from 'react'

const DropDown = ({ label, options, value, onSelect, className, moreOption, moreOptionClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState()

  const toggleOptions = () => {
    if (options !== null && options.length > 1) {
      setIsOpen(!isOpen)
    }
  }

  const handleOptionClick = (optionValue) => {
    setSelectedOption(optionValue)
    setIsOpen(false)
    onSelect(optionValue)
  }

  useEffect(() => {
    if (options === null || options.length === 0) {
      setSelectedOption('')
      return
    }

    if (value !== undefined && options.length > 0) {
      const defaultValue = options.find((option) => option === value)
      console.log(defaultValue)
      if (defaultValue) {
        setSelectedOption(defaultValue)
        onSelect(defaultValue)
      } else {
        setSelectedOption(options[0])
        onSelect(options[0])
      }

      return
    }

    setSelectedOption(options[0])
    onSelect(options[0])
  }, [options])

  return (
    <div className={`flex flex-col items-center justify-start w-full gap-1 ${className}`}>
      <p className='w-full font-medium text-secondary flex gap-2 justify-start items-center'>
        {label}{' '}
        <span className='cursor-pointer' onClick={() => moreOptionClick()}>
          {moreOption ?? ''}
        </span>
      </p>
      <div className='relative h-16 w-full'>
        <button
          className={` ${className} min-h-full absolute flex max-h-72 w-full cursor-pointer flex-col gap-6 rounded-2xl bg-[#F7F8F9] p-5 capitalize text-secondary transition-all ${
            isOpen ? 'overflow-y-scroll shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)]' : ''
          }`}
          onClick={toggleOptions}
        >
          <span className='flex w-full items-center justify-between capitalize transition-all'>
            <p>{selectedOption}</p>

            {options !== null && options.length > 1 && (
              <span className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-500`}>
                <img src='/images/icons/chevron-down.svg' className='h-6 w-6 max-w-fit' alt='chevron-down' />
              </span>
            )}
          </span>
          {isOpen &&
            options !== null &&
            options.length > 0 &&
            options
              .filter((option) => option !== selectedOption)
              .map((option, index) => (
                <span
                  key={'option-' + index}
                  className='option text-left w-full items-center justify-between capitalize transition-all '
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </span>
              ))}
        </button>
      </div>
    </div>
  )
}

export default DropDown
