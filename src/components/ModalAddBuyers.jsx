import { motion } from 'framer-motion'
import React, { useCallback } from 'react'
import { useClickOutside } from '../hooks/use-click-outside'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaAddCustomerBuy } from '../helpers/schema'
import { addCustomerToCar } from '../utils'
import { showToastSuccess } from '../helpers'

const ModalAddBuyers = ({ setShow, data, setCustomerBuy }) => {
  const nodeRef = useClickOutside(() => {
    setShow(false)
  })

  const handleOffModal = useCallback(() => {
    setShow(false)
  }, [setShow])

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
  } = useForm({ resolver: yupResolver(schemaAddCustomerBuy), mode: 'onChange' })
  const onInvalid = (errors) => console.error(errors)

  const onHandleSubmit = async (customer, event) => {
    const listCustomerBuy = JSON.parse(localStorage.getItem('listCustomerBuy'))

    if (listCustomerBuy !== null) {
      const list = addCustomerToCar(listCustomerBuy, data.id, customer)
      localStorage.setItem('listCustomerBuy', JSON.stringify(list))
      handleOffModal()
      const listCustomerByCar = list.find((item) => item.car === data.id)
      setCustomerBuy(listCustomerByCar.listCustomer)
    } else {
      const newCustomerBuy = [
        {
          car: data.id,
          listCustomer: [
            {
              ...customer,
            },
          ],
        },
      ]
      localStorage.setItem('listCustomerBuy', JSON.stringify(newCustomerBuy))

      setCustomerBuy(newCustomerBuy[0].listCustomer)
    }
    showToastSuccess({ message: `Add customer ${customer.full_name} success!` })
  }

  const onPhoneNumberChange = (event) => {
    const { value } = event.target
    const sanitizedValue = value.replace(/\D/g, '')
    setValue('phoneNumber', sanitizedValue)
    trigger('phoneNumber')
  }

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
        className='max-w-[500px] min-h-[316px] h-auto border-l-[6px] shadow-lg border-[#f97316] rounded-3xl gap-5 flex flex-col items-center justify-between p-10 bg-[#FFFFFF] m-auto z-20 '
      >
        <h2 className='font-semibold text-2xl text-center capitalize text-[#3B3B3B]'>Add new customer buy this car</h2>
        <div>
          <form
            onSubmit={handleSubmit(onHandleSubmit, onInvalid)}
            className='flex flex-col justify-center items-center outline-none'
          >
            <div className='flex flex-col justify-center items-center px-10 mt-4 rounded-2xl'>
              <input
                {...register('full_name')}
                type='text'
                placeholder='Full name'
                className={`py-2 px-4 border-[#f97316] ring-[#f97316] ring-1
                    ${
                      errors.full_name
                        ? 'block peer rounded-[5px] w-[25rem]  mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]'
                        : 'block peer rounded-[5px] w-[25rem] mt-5 focus:outline-none'
                    }`}
              />
              <span className='place-self-start text-[14px] text-[#C93B32]'>{errors.full_name?.message}</span>

              <input
                {...register('phoneNumber')}
                onChange={onPhoneNumberChange}
                type='tel'
                placeholder='Phone Number'
                maxLength={10}
                className={`py-2 px-4 border-[#f97316] ring-[#f97316] ring-1
                    ${
                      errors.phoneNumber
                        ? 'block peer rounded-[5px] w-[25rem]  mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]'
                        : 'block peer rounded-[5px] w-[25rem] mt-5 focus:outline-none'
                    }`}
              />
              <span className='place-self-start text-[14px] text-[#C93B32]'>{errors.phoneNumber?.message}</span>

              <input
                {...register('address')}
                type='text'
                placeholder='Address'
                className={`py-2 px-4 border-[#f97316] ring-[#f97316] ring-1
                    ${
                      errors.address
                        ? 'block peer rounded-[5px] w-[25rem]  mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]'
                        : 'block peer rounded-[5px] w-[25rem] mt-5 focus:outline-none'
                    }`}
              />
              <span className='place-self-start text-[14px] text-[#C93B32]'>{errors.address?.message}</span>

              <button
                type='submit'
                className={`rounded-xl bg-[#f97316] text-[#F5F7FF] w-[25rem] p-4 mt-10 hover:bg-opacity-80`}
              >
                Add
              </button>
            </div>
          </form>
        </div>

        <div className='w-full flex items-center gap-4 z-[1000]'>
          <button
            className='rounded-xl p-4 text-[#6e7071] bg-[#d5d3d3] bg-opacity-25 flex-1 text-lg '
            onClick={() => handleOffModal()}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ModalAddBuyers
