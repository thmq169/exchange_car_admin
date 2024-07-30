import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { selectUser } from '../store/reducers/auth-slice'
import Breadcrumbs from '../components/Breadcrumbs'
import OwnerDetail from '../components/OwnerProfile'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaChangePassword } from '../helpers/schema'
import { authService } from '../services/auth.service'
import { getLocalStorageAcceToken } from '../utils'
import { setLoading } from '../store/reducers/app-slice'
import { showToastError, showToastSuccess } from '../helpers'
import Toggle from '../icons/Toggle'

const Profile = () => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [enableChangePassword, setChangePassword] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schemaChangePassword), mode: 'onChange' })

  const onInvalid = (errors) => console.error(errors)

  const onHandleSubmit = async (data, event) => {
    event.preventDefault()
    dispatch(setLoading(true))
    try {
      const res = await authService.updatePassword({ data: data, access_token: getLocalStorageAcceToken() })

      if (res.status === 200) {
        showToastSuccess({ message: 'Change password successfully' })
      }
    } catch (error) {
      showToastError({ message: error.message })
    } finally {
      dispatch(setLoading(false))
      reset()
    }
  }

  const handleShowChangePassword = () => {
    setChangePassword(!enableChangePassword)
  }

  return (
    <>
      <div className='m-2 md:mx-10 mt-24 md:mt-10 p-2 '>
        <Breadcrumbs />
      </div>
      <div className='m-2 mt-10 md:mt-4 md:mx-10 p-2 md:p-10 bg-white rounded-3xl flex flex-col  gap-6'>
        <OwnerDetail customer={user} enableUpdate={true} />
        <div className='flex items-center gap-4'>
          <Toggle isActive={enableChangePassword} setIsActive={handleShowChangePassword} />
          <div className='font-semibold'>Change Your Password</div>
        </div>
        {enableChangePassword && (
          <div>
            <div className='w-fit bg-[#f97316] rounded-tr-lg rounded-tl-lg gap-[-16px] bg-opacity-80 px-8 py-2 text-white font-medium'>
              Change Password
            </div>
            <div className='border-[#f97316] border p-4 rounded-tr-lg rounded-br-lg rounded-bl-lg overflow-hidden'>
              <form onSubmit={handleSubmit(onHandleSubmit, onInvalid)} className=' outline-none'>
                <div className='grid grid-cols-3 gap-4'>
                  <div>
                    <p className='w-full font-medium text-secondary '>Current Password</p>
                    <input
                      {...register('current_password')}
                      type='password'
                      placeholder=''
                      maxLength={10}
                      className={`py-2 px-4 border-[#f97316] ring-[#f97316] ring-1 w-full mt-3
                  ${
                    errors.phoneNumber
                      ? 'block peer rounded-[5px]  border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]'
                      : 'block peer rounded-[5px]  focus:outline-none'
                  }`}
                    />
                    <span className='place-self-start text-[14px] text-[#C93B32]'>
                      {errors.current_password?.message}
                    </span>
                  </div>
                  <div>
                    <p className='w-full font-medium text-secondary '>New Password</p>
                    <input
                      {...register('new_password')}
                      type='password'
                      placeholder=''
                      className={`py-2 px-4 border-[#f97316] ring-[#f97316] ring-1 w-full mt-3  ${
                        errors.password
                          ? 'block peer rounded-[5px]  border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]'
                          : 'block peer rounded-[5px] border-[#AEBBCD]  focus:outline-none'
                      }`}
                    />
                    <span className='place-self-start text-[14px] text-[#C93B32]'>{errors.new_password?.message}</span>
                  </div>
                  <div>
                    <p className='w-full font-medium text-secondary '>Confirm Password</p>
                    <input
                      {...register('confirmed_password')}
                      type='password'
                      placeholder=''
                      className={`py-2 px-4 border-[#f97316] ring-[#f97316] ring-1 w-full mt-3  ${
                        errors.password
                          ? 'block peer rounded-[5px]  border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]'
                          : 'block peer rounded-[5px] border-[#AEBBCD]  focus:outline-none'
                      }`}
                    />
                    <span className='place-self-start text-[14px] text-[#C93B32]'>
                      {errors.confirmed_password?.message}
                    </span>
                  </div>
                  <div></div>
                  <div></div>
                  <div className='flex justify-center items-center flex-col'>
                    {/* <div className='opacity-0'>Confirm button</div> */}
                    <button
                      type='submit'
                      className={`rounded-xl bg-[#f97316] w-full py-3 text-[#F5F7FF] hover:bg-opacity-80`}
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Profile
