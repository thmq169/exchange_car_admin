import { useEffect, useState } from 'react'
import { getLocalStorageAcceToken, getNumberFromId } from '../utils'
import avatar1 from '../data/avatar1.png'
import avatar2 from '../data/avatar2.png'
import avatar3 from '../data/avatar3.png'
import avatar4 from '../data/avatar4.png'
import Button from './Button'
import { DetailTag } from '../pages/PostDetail'
import { RiCharacterRecognitionLine } from 'react-icons/ri'
import { BsFillPinMapFill, BsFillTelephoneFill } from 'react-icons/bs'
import { FaMailBulk, FaMapMarkedAlt } from 'react-icons/fa'
import { MdLocationCity } from 'react-icons/md'
import { FiCreditCard } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { setLoading } from '../store/reducers/app-slice'
import { selectUser, setUser } from '../store/reducers/auth-slice'
import { customerService } from '../services/customer.service'
import { authService } from '../services/auth.service'
import { showToastError, showToastSuccess } from '../helpers'

const OwnerDetail = ({ customer, enableUpdate = false }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [defaultAvatar, setDefaultAvatar] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [updateField, setUpdateField] = useState(false)
  const [formData, setFormData] = useState(null)
  const [owner, setOwner] = useState(customer)

  useEffect(() => {
    const getOwnerProfile = async () => {
      const response = await authService.getProfile(getLocalStorageAcceToken())
      dispatch(setUser(response.data.data.currentUser))
      setOwner(response.data.data.currentUser)
      setAvatar(response.data.data.currentUser.avatar_url)
    }
    if (customer === null) {
      getOwnerProfile()
      return
    }
    setDefaultAvatar(customer.avatar_url)
    setAvatar(customer.avatar_url)
  }, [])

  const userAvatar = (id) => {
    const numberAvatar = getNumberFromId(id)

    switch (numberAvatar) {
      case 1:
        return avatar1
      case 2:
        return avatar2
      case 3:
        return avatar3
      case 4:
        return avatar4
      default:
        return avatar1
    }
  }

  const onSelectFile = (event) => {
    const selectedFile = event.target.files[0]
    setAvatar(URL.createObjectURL(selectedFile))
    setFormData((pre) => ({ ...pre, avatar: selectedFile }))
  }

  const deleteHandler = () => {
    setAvatar(defaultAvatar)
    URL.revokeObjectURL(avatar)
  }

  const handleSendUpdate = async () => {
    dispatch(setLoading(true))
    try {
      const res = await customerService.updateProfile({ data: formData, access_token: getLocalStorageAcceToken() })
      dispatch(setUser(res.data.data.updatedUser))
      setDefaultAvatar(res.data.data.updatedUser.avatar_url)
      setAvatar(res.data.data.updatedUser.avatar_url)
      showToastSuccess({ message: 'Your profile has been updated' })
    } catch (error) {
      console.log(error)
      showToastError({ message: 'An error has occurred while updating your profile' })
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleUpdateProfile = async () => {
    if (updateField) {
      setUpdateField(false)
      handleSendUpdate()
    } else setUpdateField(true)
  }

  const onChangeProfile = (name, value) => {
    setFormData((pre) => ({ ...pre, [name]: value }))
  }

  return (
    owner && (
      <div>
        <div className='w-fit bg-[#f97316] rounded-tr-lg rounded-tl-lg gap-[-16px] bg-opacity-80 px-8 py-2 text-white font-medium'>
          Owner
        </div>
        <div className='border-[#f97316] border p-4 rounded-tr-lg rounded-br-lg rounded-bl-lg overflow-hidden'>
          <div className='grid grid-cols-2 gap-6 ' dir='rtl'>
            <div className='col-span-1 justify-center items-center flex'>
              <div className='flex justify-center items-center h-fit p-4 flex-col gap-4'>
                <div className='flex justify-center items-center rounded-full overflow-hidden w-[300px] h-[300px]'>
                  <img src={avatar ?? userAvatar(owner.id)} alt='user-profile' className='w-full h-full object-cover' />
                </div>
                {enableUpdate && (
                  <div
                    className='flex justify-between items-center gap-4 flex-row-reverse'
                    style={{ width: '-webkit-fill-available' }}
                  >
                    {avatar === defaultAvatar && (
                      <label className='rounded-xl bg-[#f97316] text-[#F5F7FF] w-full p-3  hover:bg-opacity-80 text-center'>
                        Change Avatar
                        <input
                          type='file'
                          className='hidden'
                          id='fileAvatar'
                          onChange={onSelectFile}
                          accept='image/png , image/jpeg, image/webp'
                        />
                      </label>
                    )}

                    {avatar !== defaultAvatar && (
                      <div className='flex w-full items-center gap-4 flex-col'>
                        <Button
                          onClick={() => handleSendUpdate()}
                          className='rounded-xl bg-[#f97316] text-[#F5F7FF] w-full p-3  hover:bg-opacity-80 text-center'
                          text='Update Avatar'
                        />
                        <Button
                          onClick={() => deleteHandler()}
                          className='rounded-xl text-[#333] w-full p-3  hover:bg-opacity-80 text-center font-semibold text-opacity-80'
                          text='Cancle'
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className='col-span-1'>
              <div className=' w-full overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
                <div className='grid grid-cols-2 gap-4  h-auto' dir='ltr'>
                  <DetailTag
                    heading='Fist Name'
                    description={owner.first_name}
                    icon={<RiCharacterRecognitionLine className='w-5 h-5' />}
                    isUpdate={updateField}
                    name='first_name'
                    onChangeProfile={onChangeProfile}
                  />
                  <DetailTag
                    heading='Last Name'
                    description={owner.last_name}
                    icon={<RiCharacterRecognitionLine className='w-5 h-5' />}
                    isUpdate={updateField}
                    name='last_name'
                    onChangeProfile={onChangeProfile}
                  />
                  <DetailTag
                    heading='Phone'
                    description={owner.mobile_phone}
                    icon={<BsFillTelephoneFill className='w-5 h-5' />}
                    isUpdate={updateField}
                    type='tel'
                    name='mobile_phone'
                    onChangeProfile={onChangeProfile}
                  />
                  <DetailTag
                    heading='Email'
                    description={owner.email}
                    icon={<FaMailBulk className='w-5 h-5' />}
                    isUpdate={updateField}
                    name='email'
                    onChangeProfile={onChangeProfile}
                  />
                  <DetailTag
                    heading='City'
                    description={owner.city_address}
                    icon={<MdLocationCity className='w-5 h-5' />}
                    isUpdate={updateField}
                    name='city_address'
                    onChangeProfile={onChangeProfile}
                  />
                  <DetailTag
                    heading='District'
                    description={owner.district_address}
                    icon={<BsFillPinMapFill className='w-5 h-5' />}
                    isUpdate={updateField}
                    name='district_address'
                    onChangeProfile={onChangeProfile}
                  />
                  <DetailTag
                    heading='Address'
                    description={owner.specific_address}
                    icon={<FaMapMarkedAlt className='w-5 h-5' />}
                    className='col-span-2'
                    isUpdate={updateField}
                    name='specific_address'
                    onChangeProfile={onChangeProfile}
                  />
                  <DetailTag
                    heading='About'
                    description={owner.about}
                    icon={<FiCreditCard className='w-5 h-5' />}
                    className='col-span-2'
                    isUpdate={updateField}
                    name='about'
                    onChangeProfile={onChangeProfile}
                  />
                  {updateField ? (
                    <Button
                      text='Cancel'
                      className='rounded-xl bg-[#f97316] text-[#F5F7FF] w-full p-3  hover:bg-opacity-80 text-center '
                      onClick={() => setUpdateField(false)}
                    />
                  ) : (
                    <div></div>
                  )}
                  {enableUpdate && (
                    <Button
                      text={updateField ? 'Update' : 'Update Your Information'}
                      className='rounded-xl bg-[#f97316] text-[#F5F7FF] w-full p-3  hover:bg-opacity-80 text-center '
                      onClick={() => handleUpdateProfile()}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default OwnerDetail
