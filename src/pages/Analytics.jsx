import React from 'react'

import { IoMdPerson } from 'react-icons/io'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'

import { Pie, Button } from '../components'
import { dropdownData } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider'
import useGetData from '../hooks/use-get-data'
import {
  calculateBodyTypePercentages,
  calculateBrandPercentages,
  calculateCityPercentages,
  calculateFuelPercentages,
  getNumberFromId,
} from '../utils'

import { FaCar, FaUserTie } from 'react-icons/fa'
import CardInfor from '../components/CardInfor'
import { SiBrandfolder } from 'react-icons/si'

import avatar1 from '../data/avatar1.png'
import avatar2 from '../data/avatar2.png'
import avatar3 from '../data/avatar3.png'
import avatar4 from '../data/avatar4.png'
import { useNavigate } from 'react-router-dom'
import Bar from '../components/Charts/Bar'

const DropDown = ({ currentMode }) => (
  <div className='w-28 border-1 border-color px-2 py-1 rounded-md'>
    <DropDownListComponent
      id='time'
      fields={{ text: 'Time', value: 'Id' }}
      style={{ border: 'none', color: currentMode === 'Dark' && 'white' }}
      value='1'
      dataSource={dropdownData}
      popupHeight='220px'
      popupWidth='120px'
    />
  </div>
)

const RecenPostItem = ({ imageSrc, name, brand, model, cusName }) => (
  <div className='grid grid-cols-5 gap-2 font-semibold hover:bg-[#e8e8e8] rounded-[16px]'>
    <div className='overflow-hidden rounded-[16px] w-fit h-[80px]'>
      <img src={imageSrc} alt='recent-post-item' className='w-[100px] h-full  object-cover' />
    </div>
    <div className='flex flex-1 w-full items-center'>
      <span className='text-sm font-semibold truncate'>{name}</span>
    </div>
    <div className='flex items-center'>
      <span className='text-sm font-semibold'>{brand}</span>
    </div>
    <div className='flex items-center'>
      <span className='text-sm font-semibold'>{model}</span>
    </div>
    <div className='flex items-center pr-2'>
      <span className='text-sm font-semibold truncate'>{cusName}</span>
    </div>
  </div>
)

const NewestCustomer = ({ imageSrc, name }) => {
  const avatar = getNumberFromId(imageSrc)

  let img = null

  switch (avatar) {
    case 1:
      img = avatar1
      break
    case 2:
      img = avatar2
      break
    case 3:
      img = avatar3
      break
    case 4:
      img = avatar4
      break
    default:
      img = avatar1
  }

  return (
    <div className='flex items-center justify-between gap-3 font-semibold hover:bg-[#e8e8e8] rounded-[16px]'>
      <div className='overflow-hidden rounded-[16px] w-fit h-[80px]'>
        <img src={img} alt='recent-post-item' className='w-[100px] h-full  object-cover' />
      </div>
      <div className='flex flex-1 w-full justify-center'>
        <span className='text-sm font-semibold truncate'>{name}</span>
      </div>
    </div>
  )
}

const Analytics = () => {
  const { currentColor } = useStateContext()
  const { posts, brands, latestPost } = useGetData()
  const navigate = useNavigate()

  return (
    posts.length > 0 && (
      <div className='mt-12'>
        <div className='flex flex-wrap lg:flex-nowrap justify-center mx-[5.5rem]'>
          <div className='flex flex-wrap justify-between gap-4 items-center w-full '>
            <CardInfor
              title='Total Cars'
              body={posts.length}
              subTitle='Cars'
              icon={<FaCar className='w-12 h-12' />}
              className='text-[rgb(255,244,229)] bg-[rgb(254,201,15)] w-1/4'
            />
            <CardInfor
              title='Total Brands'
              body={brands.car_brands ? brands.car_brands.length : 0}
              subTitle='Brands'
              icon={<SiBrandfolder className='w-12 h-12' />}
              className='text-[rgb(255,244,229)] bg-[rgb(228,106,118)] w-1/4'
            />
            <CardInfor
              title='Total Customer'
              body={120}
              subTitle='Customers'
              icon={<IoMdPerson className='w-12 h-12' />}
              className='text-[#E5FAFB] bg-[#03C9D7] w-1/4'
            />
            <CardInfor
              title='Total Staff'
              body={10}
              subTitle='Staffs'
              icon={<FaUserTie className='w-12 h-12' />}
              className='text-[rgb(235,250,242)] bg-[rgb(0,194,146)] w-1/4'
            />
          </div>
        </div>

        <div className='flex gap-10 m-4 flex-wrap justify-center'>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760'>
            <div className='flex justify-between items-center gap-2 mb-6'>
              <p className='text-xl font-semibold'>Recent Posts</p>
            </div>
            <div className='grid grid-cols-5 gap-2 font-bold'>
              <div></div>
              <div>Name</div>
              <div>Brands</div>
              <div>Model</div>
              <div>Customer</div>
            </div>
            <div className='md:w-full overflow-auto flex flex-col gap-2'>
              {[...latestPost.slice(0, 5)].map((post, index) => (
                <RecenPostItem
                  key={'recent-post-' + index}
                  imageSrc={post.car.car_galleries[0].gallery_url}
                  name={post.car.car_name}
                  brand={post.car.car_brand}
                  model={post.car.car_model}
                  cusName={post.customer.first_name + ' ' + post.customer.last_name}
                />
              ))}
            </div>
            <div className='flex justify-between items-center mt-5 border-t-1 border-color'>
              <div className='mt-3'>
                <Button
                  color='white'
                  bgColor={currentColor}
                  text='View All'
                  borderRadius='10px'
                  className='px-8'
                  onClick={() => navigate('/posts')}
                />
              </div>
              <p className='text-gray-400 text-sm'>{latestPost.length} Recent Post Car</p>
            </div>
          </div>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl'>
            <div className='flex justify-between items-center gap-2'>
              <p className='text-xl font-semibold'>Newest Customers</p>
            </div>
            <div className='mt-6 w-72 md:w-400 flex flex-col gap-2'>
              <div className='grid grid-cols-2 gap-2 font-bold'>
                <div></div>
                <div>Full name</div>
              </div>
              {[...posts.slice(-5)].map((post, index) => (
                <NewestCustomer
                  key={'newest-customer-' + index}
                  imageSrc={post.id}
                  name={post.customer.first_name + ' ' + post.customer.last_name}
                />
              ))}
            </div>
            <div className='flex justify-between items-center mt-5 border-t-1 border-color'>
              <div className='mt-3'>
                <Button
                  onClick={() => navigate('/posts')}
                  color='white'
                  bgColor={currentColor}
                  text='View Customers'
                  borderRadius='10px'
                />
              </div>
              <p className='text-gray-400 text-sm'>10 Newest Customers</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 m-8 gap-10 px-11'>
          <div className=' p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
            <div className='w-full'>
              <p className='text-center dark:text-gray-200 text-xl mb-2 mt-3'>Distribution of brands in the system</p>
              <Pie
                name='Brand'
                id='chart-pie-1'
                data={calculateBrandPercentages(posts)}
                legendVisiblity
                height='full'
                className='w-full'
              />
            </div>
          </div>
          <div className=' p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
            <div className='w-full'>
              <p className='text-center dark:text-gray-200 text-xl mb-2 mt-3 capitalize'>
                Vehicle allocation percentage by cities
              </p>
              <Pie
                name='City'
                id='chart-pie-2'
                data={calculateCityPercentages(posts)}
                legendVisiblity
                height='full'
                className='w-full'
              />
            </div>
          </div>
          <div className=' p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
            <div className='w-full'>
              <p className='text-center dark:text-gray-200 text-xl mb-2 mt-3 capitalize'>
                Distribution of vehicles by engine type
              </p>
              <Pie
                name='Engine Type'
                id='chart-pie-3'
                data={calculateFuelPercentages(posts).reverse()}
                legendVisiblity
                height='full'
                className='w-full'
              />
            </div>
          </div>
          <div className=' p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
            <div className='w-full'>
              <p className='text-center dark:text-gray-200 text-xl mb-2 mt-3 capitalize'>Distribution of car type</p>
              <Bar
                data={calculateBodyTypePercentages(posts)}
                titleChart='Body Type (In Percentage)'
                titleHeading=''
                nameColumn='Type Percentage'
              />
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Analytics
