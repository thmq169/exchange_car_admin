import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { selectUser, selectUserToken, setUserToken } from '../store/reducers/auth-slice'
import Logo from '../icons/Logo'
import { getUserProfile } from '../store/actions/auth.action'
import { selectLoading } from '../store/reducers/app-slice'
import Loading from '../components/Loading'

const AuthLayout = () => {
  const navigate = useNavigate()
  const userToken = useAppSelector(selectUserToken)
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const loading = useAppSelector(selectLoading)

  const fetchUser = async (access_token) => {
    await dispatch(getUserProfile({ access_token: access_token }))
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token !== null) {
      dispatch(setUserToken(token))
      fetchUser(token)
    }
  }, [navigate, dispatch, userToken])

  useEffect(() => {
    if (userToken !== null && user !== null) {
      if (user.user_roles.includes('Admin')) {
        navigate('/analytics')
      } else if (user.user_roles.includes('Individual Customer')) {
        navigate('/cars')
      } else if (user.user_roles.includes('Staff')) {
        navigate('/standard')
      }
    }
  }, [user, userToken, navigate])

  return (
    <>
      {loading && <Loading />}
      <div className='absolute top-[20%] right-[5%] w-fit mx-auto h-[140px] appearance-none outline-none cursor-pointer rounded-[20px] flex justify-center items-center shadow-[-10px_-10px_15px_rgba(255,255,255,0.5),10px_10px_15px_rgba(70,70,70,0.12)] title-hero bg-[#f9f9f9] mb-6 animate-fly-in-down before:absolute before:content-[""] before:h-[200%] before:w-1 before:bg-half-transparent before:top-[-200%]'>
        <div className='text-shadow-primary text-[#f97316] text-[2.5rem] font-medium tracking-widest text-center rounded-2xl leading-[1.6] px-10'>
          Exchange Car
        </div>
        <div className='absolute top-3 left-3 w-4 h-4 bg-[rgb(128_126_126)] rounded-full shadow-2xl'></div>
        <div className='absolute top-3 right-3 w-4 h-4 bg-[rgb(128_126_126)] rounded-full shadow-2xl'></div>
        <div className='absolute bottom-3 left-3 w-4 h-4 bg-[rgb(128_126_126)] rounded-full shadow-2xl'></div>
        <div className='absolute bottom-3 right-3 w-4 h-4 bg-[rgb(128_126_126)] rounded-full shadow-2xl'></div>
      </div>
      <Outlet />
      <div>
        <Logo className='absolute top-[10%] w-48 h-48 left-[10%] rounded-full box-shadow-custom animate-fly-in' />
        <img
          src='/images/login/left-financial.svg'
          alt='left-financial'
          className='absolute bottom-0 left-0 w-[30rem] drop-shadow-xl'
        />
        <img
          src='/images/login/right-financial.svg'
          alt='right-financial'
          className='absolute bottom-0 right-0 w-[30rem] drop-shadow-xl'
        />
      </div>
    </>
  )
}

export default AuthLayout
