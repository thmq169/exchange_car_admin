import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
// import { BsChatLeft } from 'react-icons/bs'
// import { RiNotification3Line } from 'react-icons/ri'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { useStateContext } from '../contexts/ContextProvider'
import { useAppSelector } from '../hooks/hook'
import { selectUser } from '../store/reducers/auth-slice'

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button
      type='button'
      onClick={() => customFunc()}
      style={{ color }}
      className='relative text-xl rounded-full p-3 hover:bg-light-gray'
    >
      <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2' />
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } =
    useStateContext()

  const user = useAppSelector(selectUser)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  }, [screenSize])

  const handleActiveMenu = () => setActiveMenu(!activeMenu)

  return (
    <div className='flex justify-between p-2 md:ml-6 md:mr-6 relative'>
      <NavButton title='Menu' customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className='flex'>
        {/* <NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor} icon={<FiShoppingCart />} /> */}
        {/* <NavButton
          title='Chat'
          dotColor='#03C9D7'
          customFunc={() => handleClick('chat')}
          color={currentColor}
          icon={<BsChatLeft />}
        />
        <NavButton
          title='Notification'
          dotColor='rgb(254, 201, 15)'
          customFunc={() => handleClick('notification')}
          color={currentColor}
          icon={<RiNotification3Line />}
        /> */}
        {user && (
          <div
            className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
            onClick={() => handleClick('userProfile')}
          >
            <img
              className='rounded-full w-8 h-8'
              src={user.avatar_url ?? '/images/profile/default_avatar.jpg'}
              alt='user-profile'
            />
            <p>
              <span className='text-gray-400 text-14'>Hi,</span>{' '}
              <span className='text-gray-400 font-bold ml-1 text-14'>{user.first_name + ' ' + user.last_name}</span>
            </p>
            {/* <MdKeyboardArrowDown className='text-gray-400 text-14' /> */}
          </div>
          // <TooltipComponent content='Profile' position='BottomCenter'>
          // </TooltipComponent>
        )}

        {/* {isClicked.cart && (<Cart />)} */}
        {/* {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />} */}
        {/* {isClicked.userProfile && (
          <UserProfile
            avatar_url={user.avatar_url}
            full_name={user.first_name + ' ' + user.last_name}
            email={user.email}
            role='Admintrator'
          />
        )} */}
      </div>
    </div>
  )
}

export default Navbar
