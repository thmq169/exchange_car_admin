import React, { useEffect, useState } from 'react'
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
import { setPosts } from '../store/reducers/post-slice'
import { useNavigate } from 'react-router-dom'
import { getLocalStorageAcceToken } from '../utils'
import { setUser } from '../store/reducers/auth-slice'
import { authService } from '../services/auth.service'
import { postsService } from '../services/post.service'
import useGetData from '../hooks/use-get-data'

const Car = () => {
  const navigate = useNavigate()

  const editing = { allowDeleting: true, allowEditing: true }
  const toolbarOptions = ['Search']
  const dispatch = useAppDispatch()
  const { posts } = useGetData()
  const [postByPackage, setPostByPackage] = useState([])

  const fetchUser = async () => {
    const response = await authService.getProfile(getLocalStorageAcceToken())
    dispatch(setUser(response.data.data.currentUser))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const pathname = window.location.pathname
        const packageName = pathname.replace('/', '')
        const res = await postsService.getAllPosts()
        dispatch(setPosts(res.data.data.car_posts))
        const newPosts = res.data.data.car_posts.filter(
          (post) => String(post.package_option).toLocaleLowerCase() === packageName
        )
        setPostByPackage(newPosts)
      } catch (error) {
        console.log('Log - error:', error)
      }
    }
    if (posts.length === 0) {
      fetchPost()
    }
  }, [posts, dispatch])

  useEffect(() => {
    if (posts !== null) {
      const pathname = window.location.pathname
      const packageName = pathname.replace('/', '')

      const newPosts = posts.filter((post) => String(post.package_option).toLocaleLowerCase() === packageName)

      setPostByPackage(newPosts)
    }
  }, [window.location.pathname])

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <div className='flex justify-between items-center'>
        <Header category='Page' title='Your Car Assigned' />
      </div>
      {postByPackage.length > 0 && (
        <GridComponent
          dataSource={[...postByPackage].reverse()}
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
