import React from 'react'

import { ChartsHeader, Pie } from '../../components'
import { calculateBrandPercentages } from '../../utils'
import useGetData from '../../hooks/use-get-data'

const Line = () => {
  const { posts } = useGetData()
  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <ChartsHeader category='Brands Distribution' title='Distribution of brands in the system' />
      <div className='w-full'>
        <Pie
          name='Brand'
          id='chart-pie-21'
          data={calculateBrandPercentages(posts)}
          legendVisiblity
          height='full'
          className='w-full'
        />
      </div>
    </div>
  )
}

export default Line
