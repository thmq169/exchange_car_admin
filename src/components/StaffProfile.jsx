import { useEffect, useState } from 'react'
import { DetailTag } from '../pages/PostDetail'
import { RiCharacterRecognitionLine } from 'react-icons/ri'
import { BsFillPinMapFill, BsFillTelephoneFill } from 'react-icons/bs'
import { FaMailBulk, FaMapMarkedAlt } from 'react-icons/fa'
import { MdLocationCity } from 'react-icons/md'
import { FiCreditCard } from 'react-icons/fi'

const StaffDetail = ({ staff, title, enableUpdate = false }) => {
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {}, [])

  return (
    staff && (
      <div>
        <div className='w-fit bg-[#f97316] rounded-tr-lg rounded-tl-lg gap-[-16px] bg-opacity-80 px-8 py-2 text-white font-medium'>
          {title}
        </div>
        <div className='border-[#f97316] border p-4 rounded-tr-lg rounded-br-lg rounded-bl-lg overflow-hidden'>
          <div className='grid grid-cols-2 gap-6 ' dir='rtl'>
            <div className='col-span-1 justify-center items-center flex'>
              <div className='flex justify-center items-center h-fit p-4 flex-col gap-4'>
                <div className='flex justify-center items-center rounded-full overflow-hidden w-[300px] h-[300px]'>
                  <img
                    src={avatar ?? '/images/profile/default_avatar.jpg'}
                    alt='user-profile'
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
            </div>
            <div className='col-span-1'>
              <div className=' w-full overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
                <div className='grid grid-cols-2 gap-4  h-auto' dir='ltr'>
                  <DetailTag
                    heading='Fist Name'
                    description={staff.first_name}
                    icon={<RiCharacterRecognitionLine className='w-5 h-5' />}
                    name='first_name'
                  />
                  <DetailTag
                    heading='Last Name'
                    description={staff.last_name}
                    icon={<RiCharacterRecognitionLine className='w-5 h-5' />}
                    name='last_name'
                  />
                  <DetailTag
                    heading='Phone'
                    description={staff.mobile_phone}
                    icon={<BsFillTelephoneFill className='w-5 h-5' />}
                    type='tel'
                    name='mobile_phone'
                  />
                  <DetailTag
                    heading='Email'
                    description={staff.email}
                    icon={<FaMailBulk className='w-5 h-5' />}
                    name='email'
                  />
                  <DetailTag
                    heading='City'
                    description={staff.city_address}
                    icon={<MdLocationCity className='w-5 h-5' />}
                    name='city_address'
                  />
                  <DetailTag
                    heading='District'
                    description={staff.district_address}
                    icon={<BsFillPinMapFill className='w-5 h-5' />}
                    name='district_address'
                  />
                  <DetailTag
                    heading='Address'
                    description={staff.specific_address}
                    icon={<FaMapMarkedAlt className='w-5 h-5' />}
                    className='col-span-2'
                    name='specific_address'
                  />
                  <DetailTag
                    heading='About'
                    description={staff.about}
                    icon={<FiCreditCard className='w-5 h-5' />}
                    className='col-span-2'
                    name='about'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default StaffDetail
