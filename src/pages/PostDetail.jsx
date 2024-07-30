import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, Zoom } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/zoom'
import 'swiper/css/thumbs'
import { FaCar, FaCarSide, FaCheckSquare, FaCommentDollar } from 'react-icons/fa'
import { SiBrandfolder, SiCoronaengine } from 'react-icons/si'
import { MdLocationCity, MdModelTraining, MdOutlineAirlineSeatReclineNormal, MdOutlineUploadFile } from 'react-icons/md'
import { BsCalendar2Date, BsCreditCard2Front, BsFillPinMapFill, BsSpeedometer2 } from 'react-icons/bs'

import { RiCheckboxMultipleBlankLine, RiEarthFill, RiOilFill } from 'react-icons/ri'
import { AiOutlineBgColors, AiOutlineNumber } from 'react-icons/ai'
import { GiCarDoor, GiCarWheel } from 'react-icons/gi'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { postsService } from '../services/post.service'
import Breadcrumbs from '../components/Breadcrumbs'
import { Header } from '../components'
import OwnerDetail from '../components/OwnerProfile'

export const DetailTag = ({
  heading,
  description,
  icon,
  className,
  isUpdate = false,
  type = 'text',
  name,
  onChangeProfile,
}) => {
  const [value, setValue] = useState(description ?? '-')
  return (
    <div
      className={` rounded-lg overflow-hidden flex flex-col items-center gap-x-4 border-[#f97316] border bg-[#f97316] bg-opacity-5 ${className}`}
    >
      <div className='p-4 pb-0 flex items-center gap-2 justify-center h-fit '>
        <span className='bg-[#f97316] p-2 rounded-full text-white'>{icon}</span>
        <div className='font-bold'>{heading}</div>
      </div>
      <div className='p-4 font-medium text-sm flex-1 w-full bg-transparent'>
        <input
          className={`rounded-xl text-center flex items-center justify-center w-full bg-transparent focus:outline-none ${isUpdate && ' border-2 border-[#f97316] py-2'}`}
          type={type}
          value={isUpdate ? value : (description ?? '-')}
          readOnly={!isUpdate}
          name={name}
          onChange={(e) => {
            onChangeProfile(name, e.target.value)
            setValue(e.target.value)
          }}
        />
      </div>
    </div>
  )
}

const PostDetail = (props) => {
  const { car_slug } = useParams()
  const [activeThumb, setActiveThumb] = useState(null)
  const [post, setPost] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [parentData, setParentData] = useState(null)
  const [isShowBreadcrumbs, setIsShowBreadcrumbs] = useState(false)

  const fetchPost = async () => {
    const response = await postsService.getPost(car_slug)
    setParentData(response.data.data)
    setPost(response.data.data.car)
    setCustomer(response.data.data.customer)
    setIsShowBreadcrumbs(true)
    console.log(response.data.data.car)
  }

  useEffect(() => {
    if (car_slug) {
      fetchPost()
    } else {
      setPost(props.car)
      setCustomer(props.customer)
    }
  }, [car_slug, props])

  return (
    post && (
      <>
        {isShowBreadcrumbs && (
          <div className='m-2 md:mx-10 mt-24 md:mt-10 p-2 '>
            <Breadcrumbs />
          </div>
        )}
        <div
          className={`p-2 md:px-10 md:py-6 bg-white rounded-3xl CitiCar-DetailImagesInfor flex flex-col gap-6 ${isShowBreadcrumbs ? 'mx-10 mb-10' : 'mx-0'}`}
        >
          <div className=' w-full overflow-hidden flex flex-col gap-8'>
            <div>
              {isShowBreadcrumbs && (
                <div className='flex justify-between items-center'>
                  <Header category='Page' title='Post Detail' />
                </div>
              )}
              <div className='w-fit bg-[#f97316] rounded-tr-lg rounded-tl-lg gap-[-16px] bg-opacity-80 px-8 py-2 text-white font-medium'>
                Car
              </div>
              <div className='border-[#f97316] border p-4 rounded-tr-lg rounded-br-lg rounded-bl-lg overflow-hidden'>
                <div className='grid grid-cols-2 gap-6 '>
                  <div className='col-span-1'>
                    <div>
                      <Swiper
                        zoom={true}
                        navigation={true}
                        modules={[Navigation, Thumbs, Zoom]}
                        grabCursor={true}
                        thumbs={{ swiper: activeThumb }}
                        className='swiper-detail-main mb-2 h-auto rounded-2xl'
                        style={{ maxHeight: '500px' }}
                      >
                        {post.car_galleries.length > 0
                          ? post.car_galleries.map((item, index) => (
                              <SwiperSlide key={'big-image' + item + index}>
                                <img
                                  src={item.gallery_url}
                                  alt='detail'
                                  className='w-full h-[420px] object-cover'
                                  // style={{
                                  //   backgroundImage: `url(${item.gallery_url})`,
                                  //   backgroundRepeat: 'no-repeat',
                                  //   width: '100%',
                                  //   height: '420px',
                                  //   backgroundPosition: '50% 70%',
                                  //   backgroundSize: 'cover',
                                  // }}
                                />
                              </SwiperSlide>
                            ))
                          : ''}
                      </Swiper>
                      <Swiper
                        onSwiper={setActiveThumb}
                        slidesPerView={3}
                        spaceBetween={6}
                        navigation={true}
                        grabCursor={true}
                        modules={[Navigation, Thumbs]}
                        className='swiper-detail-thumb h-auto cursor-pointer'
                        breakpoints={{
                          768: {
                            slidesPerView: 5,
                          },
                          1220: {
                            slidesPerView: 5,
                          },
                        }}
                      >
                        {post && post.car_galleries.length > 0
                          ? post.car_galleries.map((item, index) => (
                              <SwiperSlide key={'small-image' + item + index}>
                                <img
                                  src={item.gallery_url}
                                  className='thumb-image rounded-2xl w-full h-[90px] object-cover'
                                  alt='thumb'
                                  // style={{
                                  //   backgroundImage: `url(${item.gallery_url})`,
                                  //   backgroundRepeat: 'no-repeat',
                                  //   width: '100%',
                                  //   height: '90px',
                                  //   backgroundPosition: 'center',
                                  //   backgroundSize: 'cover',
                                  // }}
                                />
                              </SwiperSlide>
                            ))
                          : ''}
                      </Swiper>
                    </div>
                  </div>
                  <div className='col-span-1'>
                    <div className='h-[520px] w-full overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
                      <div className='grid grid-cols-2 gap-4  h-auto'>
                        <DetailTag heading='ID' description={post.id} icon={<AiOutlineNumber className='w-5 h-5' />} />
                        <DetailTag heading='Name' description={post.car_name} icon={<FaCar className='w-5 h-5' />} />
                        <DetailTag
                          heading='Price'
                          description={post.selling_price}
                          icon={<FaCommentDollar className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Brand'
                          description={post.car_brand}
                          icon={<SiBrandfolder className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Model'
                          description={post.car_model}
                          icon={<MdModelTraining className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Variant'
                          description={post.car_variant}
                          icon={<RiCheckboxMultipleBlankLine className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Manufacturing Date'
                          description={post.manufacturing_date}
                          icon={<BsCalendar2Date className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Origin'
                          description={post.car_origin}
                          icon={<RiEarthFill className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='City'
                          description={post.city}
                          icon={<MdLocationCity className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='District'
                          description={post.district}
                          icon={<BsFillPinMapFill className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Status'
                          description={post.car_status}
                          icon={<FaCheckSquare className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Body Type'
                          description={post.body_type}
                          icon={<FaCarSide className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Mileage'
                          description={post.car_mileage ?? 0}
                          icon={<BsSpeedometer2 className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Transmission'
                          description={post.transmission}
                          icon={<SiCoronaengine className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Engine Type'
                          description={post.engine_type}
                          icon={<RiOilFill className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Out Color'
                          description={post.out_color}
                          icon={<AiOutlineBgColors className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Drive Train'
                          description={post.drivetrain}
                          icon={<GiCarWheel className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Seats'
                          description={post.total_seating}
                          icon={<MdOutlineAirlineSeatReclineNormal className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Doors'
                          description={post.total_doors}
                          icon={<GiCarDoor className='w-5 h-5' />}
                        />
                        <DetailTag
                          heading='Date Posted'
                          description={moment(props.created_at || parentData.created_at).format('DD/MM/YYYY')}
                          icon={<MdOutlineUploadFile className='w-5 h-5' />}
                        />
                        <DetailTag
                          className='col-span-2'
                          heading='Description'
                          description={post.description}
                          icon={<BsCreditCard2Front className='w-5 h-5' />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <OwnerDetail customer={customer} />
          </div>
        </div>
      </>
    )
  )
}

export default PostDetail
