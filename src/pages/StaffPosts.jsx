import React, { useEffect } from 'react'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
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
import { useAppDispatch } from '../hooks/hook'
import { setPostsUser } from '../store/reducers/post-slice'
import { useNavigate } from 'react-router-dom'
import { getLocalStorageAcceToken } from '../utils'
import { setUser } from '../store/reducers/auth-slice'
import { showToastError } from '../helpers'
import { authService } from '../services/auth.service'
import { postsService } from '../services/post.service'
import useGetData from '../hooks/use-get-data'

const Car = () => {
  const navigate = useNavigate()
  const editing = { allowDeleting: true, allowEditing: true }
  const toolbarOptions = ['Search']
  const filterSettings = { type: 'Excel' }
  const dispatch = useAppDispatch()
  const { posts } = useGetData()

  const getListPostsUser = async (userId) => {
    try {
      // await dispatch(getPostsUser({ customer_id: user.id }))
      const response = await postsService.getPostsUser({ customer_id: userId })
      dispatch(setPostsUser(response.data.data.car_posts))
    } catch (error) {
      showToastError({ message: error.message })
    }
  }

  const fetchUser = async () => {
    const response = await authService.getProfile(getLocalStorageAcceToken())
    dispatch(setUser(response.data.data.currentUser))
    // getListPostsUser(response.data.data.currentUser.id)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <div className='flex justify-between items-center'>
        <Header category='Page' title='Your Car Assigned' />
      </div>
      {posts && (
        <GridComponent
          dataSource={[...posts.slice(0, 5)].reverse()}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
          toolbar={toolbarOptions}
        >
          <ColumnsDirective>
            {postGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Page, ExcelExport, Edit, PdfExport, Toolbar]} />
        </GridComponent>
      )}
    </div>
  )
}
export default Car
