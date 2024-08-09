import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch } from '../hooks/hook'
import { useState } from 'react'
import { authService } from '../services/auth.service'
import { setUser, setUserToken } from '../store/reducers/auth-slice'
import { getPostsUser } from '../store/actions/post.action'
import { setLoading } from '../store/reducers/app-slice'

const schema = yup.object({
  password: yup.string().required('Password field is required.').min(6, 'Password minimum 6 characters'),
  phoneNumber: yup
    .string()
    .max(10)
    .required('Phone number is required.')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits.'),
})

export default function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' })
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()

  const onInvalid = (errors) => console.error(errors)

  const onHandleSubmit = async (data, event) => {
    setIsLoading(true)
    event.preventDefault()

    const { phoneNumber, password } = data
    dispatch(setLoading(true))

    try {
      const res = await authService.signIn({ mobile_phone: '+84' + phoneNumber, password: password })
      const access_token = res.data.access_token
      const userProfile = await authService.getProfile(access_token)

      const values = await Promise.all([res, userProfile])

      if (values[1].status === 200) {
        localStorage.setItem('access_token', access_token)
        dispatch(setUserToken(access_token))
        dispatch(setUser(userProfile.data.data.currentUser))
        await dispatch(getPostsUser({ customer_id: userProfile.data.data.currentUser.id }))
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const onPhoneNumberChange = (event) => {
    const { value } = event.target
    const sanitizedValue = value.replace(/\D/g, '')
    setValue('phoneNumber', sanitizedValue)
    trigger('phoneNumber')
  }

  return (
    <div className='flex flex-col items-center justify-center h-full flex-1'>
      <form
        onSubmit={handleSubmit(onHandleSubmit, onInvalid)}
        className='flex h-[calc(100vh-95px)] flex-col justify-center items-center outline-none'
      >
        <p className='place-self-start font-semibold text-base text-[#f97316]'>Login to the system</p>
        <div className='flex flex-col justify-center items-center p-10 mt-4 shadow-[-10px_-10px_15px_rgba(255,255,255,0.5),10px_10px_15px_rgba(70,70,70,0.12)] rounded-2xl bg-[rgba(247,247,247,1)]'>
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
            {...register('password')}
            type='password'
            placeholder='Password'
            className={`py-2 px-4 border-[#f97316] ring-[#f97316] ring-1  ${
              errors.password
                ? 'block peer rounded-[5px] w-[25rem] mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]'
                : 'block peer rounded-[5px] border-[#AEBBCD] w-[25rem] mt-5 focus:outline-none'
            }`}
          />
          <span className='place-self-start text-[14px] text-[#C93B32]'>{errors.password?.message}</span>

          <button
            type='submit'
            className={`rounded-full bg-[#f97316] text-[#F5F7FF] w-[25rem] p-3 mt-10 hover:bg-opacity-80`}
          >
            {isLoading ? ' Wait a minute...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  )
}
