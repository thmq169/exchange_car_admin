import React from 'react'

import { ChartsHeader, Pie } from '../../components'
import { calculateCityPercentages } from '../../utils'
import useGetData from '../../hooks/use-get-data'

const Area = () => {
  const { posts } = useGetData()
  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <ChartsHeader category='City Distribution' title='Vehicle allocation percentage by cities' />
      <div className='w-full'>
        <Pie
          name='City'
          id='chart-pie-22'
          data={calculateCityPercentages(posts)}
          legendVisiblity
          height='full'
          className='w-full'
        />
      </div>
    </div>
  )
}

export default Area
