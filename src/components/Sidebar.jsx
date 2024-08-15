import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { links } from '../data/route.js'
import { useStateContext } from '../contexts/ContextProvider'
import Logo from '../icons/Logo.jsx'
import { FiLogOut } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../hooks/hook.js'
import { selectUser, setUserToken } from '../store/reducers/auth-slice.js'

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize, setIsClicked, initialState } = useStateContext()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)

  // const fetchUser = async (access_token) => {
  //   await dispatch(getUserProfile({ access_token: access_token }))
  // }
  // useEffect(() => {
  //   if (user === null) {
  //     fetchUser(getLocalStorageAcceToken())
  //   }
  // }, [user, fetchUser])

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false)
    }
  }

  const handleLogout = () => {
    dispatch(setUserToken(null))
    localStorage.removeItem('access_token')
    setIsClicked(initialState)

    // const origin = localStorage.getItem('origin')
    // if (origin) {
    //   localStorage.removeItem('origin')
    //   window.location.replace(origin)
    // }
    navigate('/sign-in')
  }

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-xl  text-white  text-md m-2'
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-xl   text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2'

  return (
    user && (
      <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto relative'>
        {activeMenu && (
          <>
            <div className='flex justify-between items-center w-full flex-1'>
              <div
                onClick={handleCloseSideBar}
                className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'
              >
                <span className='w-20 h-20'>
                  <Logo />
                </span>
                <span style={{ color: currentColor }}>Exchange Car</span>
              </div>
              <TooltipComponent content='Menu' position='BottomCenter'>
                <button
                  type='button'
                  onClick={() => setActiveMenu(!activeMenu)}
                  style={{ color: currentColor }}
                  className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>
            <div className='mt-10 '>
              {links.map((item) => {
                if (user.user_roles.some((role) => item.role.includes(role))) {
                  return (
                    <div key={item.title}>
                      <p className='text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase'>{item.title}</p>
                      {item.links.map((link) => (
                        <NavLink
                          to={`/${link.name}`}
                          key={link.name}
                          onClick={handleCloseSideBar}
                          style={({ isActive }) => ({
                            backgroundColor: isActive ? currentColor : '',
                          })}
                          className={({ isActive }) => (isActive ? activeLink : normalLink)}
                        >
                          {link.icon}
                          <span className='capitalize '>{link.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )
                }
              })}
            </div>
            <div className='pr-2 absolute bottom-4 left-0 right-0'>
              <button
                onClick={() => handleLogout()}
                className={' flex gap-5 items-center justify-start rounded-lg bg-gray-100 w-full px-5 py-4'}
              >
                <FiLogOut className='rotate-180' />
                <span>Logout</span>
              </button>
            </div>
          </>
        )}
      </div>
    )
  )
}

export default Sidebar
