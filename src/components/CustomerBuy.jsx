import React from 'react'
import {
  ColumnDirective,
  ColumnsDirective,
  ContextMenu,
  Edit,
  ExcelExport,
  Filter,
  GridComponent,
  Inject,
  Page,
  PdfExport,
  Resize,
  Sort,
  Toolbar,
} from '@syncfusion/ej2-react-grids'

import { contextMenuItems } from '../data/contextMenu'
import { Header } from '../components'
import { customerBuyGrid } from '../components/GridTable/post'

const CustomerBuy = ({ customerBuy }) => {
  const editing = { allowDeleting: true, allowEditing: true }
  const toolbarOptions = ['Search']

  return (
    <div className=' p-2 md:pb-10 bg-white rounded-3xl'>
      <div className='flex justify-between items-center'>
        <Header category='Page' title='List Customer Buy' />
      </div>
      <GridComponent
        dataSource={customerBuy}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {customerBuyGrid.map((item, index) => (
            <ColumnDirective key={'post-item-' + index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar]} />
      </GridComponent>
    </div>
  )
}
export default CustomerBuy
