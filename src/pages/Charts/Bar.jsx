import React from 'react'

import { ChartsHeader } from '../../components'
import { calculateBodyTypePercentages } from '../../utils'
import useGetData from '../../hooks/use-get-data'
import BarChart from '../../components/Charts/Bar'

const Bar = () => {
  const { posts } = useGetData()

  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <ChartsHeader category='Body Type Distribution' title='Distribution of car type' />
      <div className=' w-full'>
        <BarChart
          data={calculateBodyTypePercentages(posts)}
          titleChart='Body Type (In Percentage)'
          titleHeading=''
          nameColumn='Type Percentage'
        />
      </div>
    </div>
  )
}

export default Bar
