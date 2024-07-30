import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'

import { Button } from '.'
import { useStateContext } from '../contexts/ContextProvider'
import { useClickOutside } from '../hooks/use-click-outside'
import { useAppDispatch } from '../hooks/hook'
import { setUserToken } from '../store/reducers/auth-slice'
// import { FiCreditCard } from 'react-icons/fi'
// import { FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa'
import { AiOutlineProfile } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { FaCar } from 'react-icons/fa'

const UserProfile = ({ avatar_url, full_name, email, role }) => {
  const dispatch = useAppDispatch()
  const { currentColor, setIsClicked, initialState } = useStateContext()
  const nodeRef = useClickOutside(() => {
    setIsClicked(initialState)
  })

  // const [userProfileData, setUserProfileData] = useState(null)

  const handleLogout = () => {
    dispatch(setUserToken(null))
    localStorage.removeItem('access_token')
    setIsClicked(initialState)
  }

  // useEffect(() => {
  //   const userProfile = [
  //     {
  //       icon: <FaPhoneAlt />,
  //       title: 'Phone Number',
  //       desc: user.mobile_phone,
  //       iconColor: '#03C9D7',
  //       iconBg: '#E5FAFB',
  //     },
  //     {
  //       icon: <FaMapMarkedAlt />,
  //       title: 'Address',
  //       desc: user.specific_address,
  //       iconColor: 'rgb(0, 194, 146)',
  //       iconBg: 'rgb(235, 250, 242)',
  //     },
  //     {
  //       icon: <FiCreditCard />,
  //       title: 'About',
  //       desc: user.about,
  //       iconColor: 'rgb(255, 244, 229)',
  //       iconBg: 'rgb(254, 201, 15)',
  //     },
  //   ]

  //   setUserProfileData(userProfile)
  // }, [])

  return (
    <div
      ref={nodeRef}
      className='nav-item absolute right-1 top-16 bg-white z-50 dark:bg-[#42464D] p-8 rounded-2xl w-[400px] shadow-lg'
    >
      <div className='flex justify-between items-center'>
        <p className='font-semibold text-lg dark:text-gray-200'>User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color='rgb(153, 171, 180)'
          bgHoverColor='light-gray'
          size='2xl'
          borderRadius='50%'
        />
      </div>
      <div className='flex gap-5 items-center mt-6 border-color border-b-1 pb-6 max-w-max'>
        <img className='rounded-full h-24 w-24' src={avatar_url} alt='user-profile' />
        <div>
          <p className='font-semibold text-xl dark:text-gray-200'> {full_name} </p>
          <p className='text-gray-500 text-sm dark:text-gray-400'>{role} </p>
          <p className='text-gray-500 text-sm font-semibold dark:text-gray-400'> {email ?? ''} </p>
        </div>
      </div>
      <div>
        <Link
          to='/profile'
          onClick={() => setIsClicked(initialState)}
          className='flex items-center gap-5 border-b-1 border-color p-4 hover:bg-slate-50 cursor-pointer  dark:hover:bg-[#42464D]'
        >
          <span className=' text-xl rounded-lg p-3  text-[rgb(0,194,146)] bg-[rgb(235,250,242)]'>
            <AiOutlineProfile />
          </span>

          <div>
            <p className='font-semibold dark:text-gray-200 '>View/Update Profile</p>
          </div>
        </Link>
        <Link
          to='/profile'
          onClick={() => setIsClicked(initialState)}
          className='flex items-center gap-5 border-b-1 border-color p-4 hover:bg-slate-50 cursor-pointer  dark:hover:bg-[#42464D]'
        >
          <span className=' text-xl rounded-lg p-3  text-[rgb(255,244,229)] bg-[rgb(254,201,15)]'>
            <FaCar />
          </span>

          <div>
            <p className='font-semibold dark:text-gray-200 '>Your Cars</p>
          </div>
        </Link>
        <div
          className='flex items-center gap-5 border-color p-4 hover:bg-slate-50 cursor-pointer  dark:hover:bg-[#42464D]'
          onClick={() => handleLogout()}
        >
          <span className=' text-xl rounded-lg p-3  text-[#03C9D7] bg-[#E5FAFB] '>
            <FiLogOut className='rotate-180' />
          </span>

          <div>
            <p className='font-semibold dark:text-gray-200 '>Logout</p>
          </div>
        </div>
      </div>
      {/* <div className='mt-5'>
        <Button
          color='white'
          bgColor={currentColor}
          text='Logout'
          borderRadius='10px'
          width='full'
          onClick={() => handleLogout()}
        />
      </div> */}
    </div>
  )
}

export default UserProfile
