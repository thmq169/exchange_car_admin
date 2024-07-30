import React from 'react'
import CountUp from './CountUp'

const CardInfor = ({ title, subTitle, body, icon, className }) => {
  return (
    <div className={`h-44 flex-1 p-4 rounded-2xl flex gap-4 justify-start shadow-xl ${className}`}>
      <div className='flex justify-center items-center rounded-full '>
        <button
          type='button'
          className={`text-2xl opacity-0.9 rounded-full p-6 hover:drop-shadow-xl bg-[#333] bg-opacity-25`}
        >
          {icon}
        </button>
      </div>
      <div className='flex flex-col gap-2 justify-center h-full'>
        <span className='font-semibold text-base'>{title}</span>
        <div className='flex gap-2 items-baseline'>
          <span className='text-5xl font-semibold '>
            <CountUp end={body} />
          </span>
          <span className='text-sm font-medium'>{subTitle}</span>
        </div>
      </div>
    </div>
  )
}

export default CardInfor
