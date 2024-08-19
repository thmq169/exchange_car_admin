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
import useGetData from '../hooks/use-get-data'
import { postGrid } from '../components/GridTable/post'

const Post = () => {
  const { posts } = useGetData()
  const filterSettings = { type: 'Excel' }
  const editing = { allowDeleting: true, allowEditing: true }
  const toolbarOptions = ['Search']

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <div className='flex justify-between items-center'>
        <Header category='Page' title='Posts' />
      </div>
      <GridComponent
        dataSource={[...posts].reverse()}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        toolbar={toolbarOptions}
        allowFiltering={true}
        filterSettings={filterSettings}
        // detailTemplate={PostDetail.bind(this)}
      >
        <ColumnsDirective>
          {postGrid.map((item, index) => (
            <ColumnDirective key={'post-item-' + index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar]} />
      </GridComponent>
    </div>
  )
}
export default Post
