import React from 'react'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from '@syncfusion/ej2-react-grids'

import { Header } from '../components'
import useGetData from '../hooks/use-get-data'
import { contextMenuItems } from '../data/contextMenu'
import { customerGrid } from '../components/GridTable/post'
import { customersWithCars } from '../utils'

const Customers = () => {
  const { posts } = useGetData()
  const filterSettings = { type: 'Excel' }
  const editing = { allowDeleting: true, allowEditing: true }
  const toolbarOptions = ['Search']

  const customer = customersWithCars(posts)

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <div className='flex justify-between items-center'>
        <Header category='Page' title='Customers' />
      </div>
      <GridComponent
        dataSource={[...customer].reverse()}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        toolbar={toolbarOptions}
        allowFiltering={true}
        filterSettings={filterSettings}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customerGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  )
}

export default Customers
