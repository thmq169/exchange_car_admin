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
  DetailRow,
} from '@syncfusion/ej2-react-grids'

import { contextMenuItems } from '../data/dummy'
import { Header } from '../components'
import { postGrid } from '../components/GridTable/post'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { selectPostsUser } from '../store/reducers/post-slice'
import PostDetail from './PostDetail'
import { getPostsUser } from '../store/actions/post.action'
import { useNavigate } from 'react-router-dom'
import { FaRegPlusSquare } from 'react-icons/fa'
import { getUserProfile } from '../store/actions/auth.action'
import { getLocalStorageAcceToken } from '../utils'
import { selectUser } from '../store/reducers/auth-slice'

const Car = () => {
  const navigate = useNavigate()
  const editing = { allowDeleting: true, allowEditing: true }
  const toolbarOptions = ['Search']
  const postsUser = useAppSelector(selectPostsUser)
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const fetchUser = async () => {
    await dispatch(getUserProfile({ access_token: getLocalStorageAcceToken() }))
  }
  const getListPostsUser = async () => {
    await dispatch(getPostsUser({ customer_id: user.id }))
  }

  useEffect(() => {
    if (user == null) {
      fetchUser()
      return
    }

    if (postsUser === null || postsUser.length === 0) {
      getListPostsUser()
    }
  }, [user, postsUser, fetchUser, getListPostsUser])

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <div className='flex justify-between items-center'>
        <Header category='Page' title='Your Car Posts' />
        <div className='flex justify-center items-center rounded-full mb-3'>
          <button
            type='button'
            className={`text-2xl text-white rounded-full p-3 hover:drop-shadow-xl bg-[#f97316] `}
            onClick={() => navigate('/posts/add-post')}
          >
            <FaRegPlusSquare className='w-6 h-6' />
          </button>
        </div>
      </div>
      {postsUser && (
        <GridComponent
          dataSource={postsUser}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
          toolbar={toolbarOptions}
          detailTemplate={PostDetail.bind(this)}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {postGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar, DetailRow]}
          />
        </GridComponent>
      )}
    </div>
  )
}
export default Car
