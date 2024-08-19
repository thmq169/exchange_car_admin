import React, { useEffect } from 'react'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  Toolbar,
} from '@syncfusion/ej2-react-grids'

import { contextMenuItems } from '../data/dummy'
import { Header } from '../components'
import { postGrid } from '../components/GridTable/post'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { selectPostsUser, setPostsUser } from '../store/reducers/post-slice'
import { useNavigate, useParams } from 'react-router-dom'
import { FaRegPlusSquare } from 'react-icons/fa'
import { showToastError } from '../helpers'
import { postsService } from '../services/post.service'

const Car = () => {
  const { customer_id } = useParams()
  const navigate = useNavigate()
  const editing = { allowDeleting: true, allowEditing: true }
  const toolbarOptions = ['Search']
  const filterSettings = { type: 'Excel' }
  const postsUser = useAppSelector(selectPostsUser)
  const dispatch = useAppDispatch()

  const getListPostsUser = async (userId) => {
    try {
      // await dispatch(getPostsUser({ customer_id: user.id }))
      const response = await postsService.getPostsUser({ customer_id: userId })
      dispatch(setPostsUser(response.data.data.car_posts))
    } catch (error) {
      showToastError({ message: error.message })
    }
  }

  useEffect(() => {
    getListPostsUser(customer_id)
  }, [customer_id])

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <div className='flex justify-between items-center'>
        <Header category='Page' title='Your Car Posts' />
        <div className='flex justify-center items-center rounded-full mb-3'>
          <button
            type='button'
            className={`text-2xl text-white rounded-full p-3 hover:drop-shadow-xl bg-[#f97316] `}
            onClick={() => navigate('/cars/add-car')}
          >
            <FaRegPlusSquare className='w-6 h-6' />
          </button>
        </div>
      </div>
      {postsUser && (
        <GridComponent
          dataSource={[...postsUser].reverse()}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
          toolbar={toolbarOptions}
          // detailTemplate={PostDetail.bind(this)}
          allowFiltering={true}
          filterSettings={filterSettings}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {postGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar]} />
        </GridComponent>
      )}
    </div>
  )
}
export default Car
