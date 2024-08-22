import { motion } from 'framer-motion'
import React, { useCallback, useRef } from 'react'
import { useClickOutside } from '../hooks/use-click-outside'
import TemplateContract from './TemplateContract'
import ReactToPrint from 'react-to-print'
import jsPDF from 'jspdf'

const ModalContract = ({ setShow, data, setPost }) => {
  const nodeRef = useClickOutside(() => {
    setShow(false)
  })

  const handleOffModal = useCallback(() => {
    setShow(false)
  }, [setShow])

  const componentRef = useRef()

  const handlePrint = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'cm',
    })
    doc.html(componentRef.current)
    handleOffModal()
  }
  return (
    <div className='fixed inset-0 z-[200] flex px-4 md:p-0 overflow-hidden'>
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
        className='max-w-[932px] relative overflow-hidden my-5 min-h-[316px] h-auto border-l-[6px] shadow-lg border-[#f97316] rounded-3xl gap-5 flex flex-col items-center justify-between p-10 bg-[#FFFFFF] m-auto z-20 '
      >
        <div className=' font-semibold text-lg text-right cursor-pointer w-full absolute top-2 right-4'>
          <button className='p-2 rounded-xl text-[#3B3B3B] font-bold' onClick={() => handleOffModal()}>
            &#x2715;
          </button>
        </div>
        <div className='h-full overflow-y-auto'>
          <div ref={componentRef} className='w-full p-12 pl-8 overflow-y-auto overflow-x-hidden flex flex-col'>
            <TemplateContract owner={data.owner} />
          </div>
          <div>
            <ReactToPrint
              trigger={() => (
                <button className='rounded-xl px-4 py-3 ml-auto mt-4 text-[#EDF5FF] flex-1 text-lg bg-[#f97316] w-fit absolute right-12 bottom-5'>
                  Print to PDF
                </button>
              )}
              content={() => componentRef.current}
              onAfterPrint={handlePrint}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ModalContract
