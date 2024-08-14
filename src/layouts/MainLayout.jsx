import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Outlet, useNavigate } from 'react-router-dom'
import { Navbar, Sidebar, ThemeSettings } from '../components'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { selectUser, selectUserToken, setUser, setUserAvatar, setUserToken } from '../store/reducers/auth-slice'
import { authService } from '../services/auth.service'
import { selectLoading } from '../store/reducers/app-slice'
import Loading from '../components/Loading'
import { showToastError, showToastSuccess } from '../helpers'

const MainLayout = () => {
  const { setCurrentColor, setCurrentMode, activeMenu, themeSettings } = useStateContext()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userToken = useAppSelector(selectUserToken)
  const user = useAppSelector(selectUser)
  const loading = useAppSelector(selectLoading)

  const fetchUser = async (access_token) => {
    const res = await authService.getProfile(access_token)
    const user = res.data.data.currentUser
    dispatch(setUser(user))
    dispatch(setUserAvatar(user.avatar_url))
    if (user.user_roles.includes('Admin')) {
      navigate('/analytics')
    } else if (user.user_roles.includes('Individual Customer')) {
      navigate('/cars')
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const extraData = JSON.parse(params.get('extraData'))
    const resultCode = JSON.parse(params.get('resultCode'))

    if (extraData !== null && extraData !== 'null' && resultCode === 0) {
      sessionStorage.setItem('paymentStatus', 0)
      showToastSuccess({ message: 'Payment success!' })
      navigate('/cars/' + extraData.car_slug)
      return
    } else if (extraData !== null && resultCode !== 0) {
      showToastError({ message: 'Payment failed!' })
    }

    const accessToken = params.get('token')
    const origin = params.get('origin')
    if (accessToken !== 'null' && accessToken !== null) {
      dispatch(setUserToken(accessToken))
      fetchUser(accessToken)
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('origin', origin)
    } else if (accessToken === 'null') {
      navigate('/sign-in')
    }
  }, [])

  useEffect(() => {
    if (userToken !== null && user !== null) {
      const paymentStatus = sessionStorage.getItem('paymentStatus')
      if (user.user_roles.includes('Admin') && paymentStatus === null) {
        navigate('/analytics')
      } else if (user.user_roles.includes('Individual Customer') && paymentStatus === null) {
        navigate('/cars')
      }
    }
  }, [userToken])

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token !== null) {
      dispatch(setUserToken(token))
      fetchUser(token)
      return
    }

    if (token === null && userToken === null) {
      dispatch(setUserToken(null))
      navigate('/sign-in')
    }
  }, [navigate, userToken])

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode')
    const currentThemeMode = localStorage.getItem('themeMode')
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor)
      setCurrentMode(currentThemeMode)
    }
  }, [])

  return (
    <>
      {loading && <Loading />}
      <div className='flex relative dark:bg-main-dark-bg'>
        {activeMenu ? (
          <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white '>
            <Sidebar />
          </div>
        ) : (
          <div className='w-0 dark:bg-secondary-dark-bg'>
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <div className='fixed md:sticky md:top-0 bg-main-bg dark:bg-main-dark-bg navbar w-full z-[100]'>
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}

            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainLayout
