import React from 'react'
import ReactLoading from 'react-loading'

const Loading = () => {
  return (
    <div className='fixed inset-0 z-[1000] flex justify-center items-center bg-[rgba(0,0,0,0.5)]'>
      <ReactLoading
        type='spinningBubbles'
        color='#f97316'
        height={'20%'}
        width={'20%'}
        className='flex justify-center items-center relative z-[1001]'
      />
    </div>
  )
}

export default Loading
