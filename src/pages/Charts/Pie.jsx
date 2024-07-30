import React from 'react'

import { ChartsHeader } from '../../components'
import { calculateFuelPercentages } from '../../utils'
import useGetData from '../../hooks/use-get-data'
import PieChart from '../../components/Charts/Pie'

const Pie = () => {
  const { posts } = useGetData()
  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <ChartsHeader category='Engine Type Distribution' title='Distribution of vehicles by engine type' />
      <div className='w-full'>
        <PieChart
          name='Engine Type'
          id='chart-id-20'
          data={calculateFuelPercentages(posts).reverse()}
          legendVisiblity
          height='full'
          className='w-full'
        />
      </div>
    </div>
  )
}

export default Pie
