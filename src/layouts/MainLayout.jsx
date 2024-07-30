import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Outlet, useNavigate } from 'react-router-dom'
import { Navbar, Sidebar, ThemeSettings } from '../components'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { selectUserToken, setUserToken } from '../store/reducers/auth-slice'
import Loading from '../components/Loading'
import { selectLoading } from '../store/reducers/app-slice'

const MainLayout = () => {
  const { setCurrentColor, setCurrentMode, activeMenu, themeSettings } = useStateContext()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userToken = useAppSelector(selectUserToken)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (userToken === null || token === null) {
      dispatch(setUserToken(null))
      navigate('/sign-in')
    }
  }, [navigate, dispatch, userToken])

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode')
    const currentThemeMode = localStorage.getItem('themeMode')
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor)
      setCurrentMode(currentThemeMode)
    }
  }, [])

  const loading = useAppSelector(selectLoading)

  return (
    <div className='flex relative dark:bg-main-dark-bg'>
      {loading && <Loading />}
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
  )
}

export default MainLayout
