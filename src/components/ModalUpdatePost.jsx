import { motion } from 'framer-motion'
import React, { useCallback } from 'react'
import { useClickOutside } from '../hooks/use-click-outside'
import UpdatePost from '../pages/UpdatePost'

const ModalUpdatePost = ({ setShow, data, handleClick, setPost }) => {
  const nodeRef = useClickOutside(() => {
    setShow(false)
  })

  const handleOffModal = useCallback(() => {
    setShow(false)
  }, [setShow])
  return (
    <div className='fixed inset-0 z-[200] flex px-4 md:p-0'>
      <div className='absolute inset-0 bg-[rgba(244,244,244,0.30)] backdrop-blur-custom'></div>
      <motion.div
        ref={nodeRef}
        key={3}
        variants={{
          hidden: { opacity: 0, y: 120 },
          visible: { opacity: 1, y: 0, transition: { delayChildren: 1.5, staggerChildren: 1 } },
        }}
        initial='hidden'
        whileInView='visible'
        className='max-w-[1060px] overflow-hidden my-5 min-h-[316px] h-auto border-l-[6px] shadow-lg border-[#f97316] rounded-3xl gap-5 flex flex-col items-center justify-between p-10 bg-[#FFFFFF] m-auto z-20 '
      >
        <div className=' font-semibold text-lg text-right cursor-pointer w-full'>
          <button className='p-2 rounded-xl text-[#3B3B3B] font-bold' onClick={() => handleOffModal()}>
            &#x2715;
          </button>
        </div>

        <UpdatePost data={data.car} parentData={data} handleOffModal={handleOffModal} setPost={setPost} />
      </motion.div>
    </div>
  )
}

export default ModalUpdatePost
