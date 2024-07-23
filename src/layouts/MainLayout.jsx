import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Outlet, useNavigate } from 'react-router-dom'
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components'
import { useAppSelector } from '../hooks/hook'
import { selectUser } from '../store/reducers/auth-slice'

const MainLayout = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, themeSettings } = useStateContext()

  const navigate = useNavigate()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
    }
  }, [navigate, user])

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode')
    const currentThemeMode = localStorage.getItem('themeMode')
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor)
      setCurrentMode(currentThemeMode)
    }
  }, [])

  return (
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
        <div className='fixed md:sticky md:top-0 bg-main-bg dark:bg-main-dark-bg navbar w-full '>
          <Navbar />
        </div>
        <div>
          {themeSettings && <ThemeSettings />}

          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
