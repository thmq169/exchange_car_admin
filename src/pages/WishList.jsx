import React, { useEffect } from 'react'
import { Header } from '../components'
import { showToastError } from '../helpers'
import { customerService } from '../services/customer.service'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { selectWishList, setWishList } from '../store/reducers/customer-slice'
import { getLocalStorageAcceToken } from '../utils'
import {
  ColumnDirective,
  ColumnsDirective,
  ContextMenu,
  Filter,
  GridComponent,
  Inject,
  Page,
  Resize,
  Sort,
  Toolbar,
} from '@syncfusion/ej2-react-grids'
import { wishListGrid } from '../components/GridTable/post'

const contextMenuItems = [
  'AutoFit',
  'AutoFitAll',
  'SortAscending',
  'SortDescending',
  'FirstPage',
  'PrevPage',
  'LastPage',
  'NextPage',
]

const WishList = () => {
  const dispatch = useAppDispatch()
  const wishList = useAppSelector(selectWishList)

  const getWishListByUser = async (access_token) => {
    try {
      const res = await customerService.getWishList(access_token)
      dispatch(setWishList(res.data.data))
    } catch (error) {
      showToastError({ message: error.message })
    }
  }

  useEffect(() => {
    const access_token = getLocalStorageAcceToken()
    const params = new URLSearchParams(window.location.search)
    const accessToken = params.get('token')
    getWishListByUser(access_token ?? accessToken)
  }, [])

  const toolbarOptions = ['Search']
  const filterSettings = { type: 'Excel' }

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <div className='flex justify-between items-center'>
        <Header category='Page' title='Wish List' />
      </div>
      <div className='w-full'>
        {wishList !== null && wishList.total_posts_in_wishlist > 0 ? (
          <GridComponent
            dataSource={[...wishList.wishlist.car_posts].reverse()}
            allowPaging
            allowSorting
            contextMenuItems={contextMenuItems}
            toolbar={toolbarOptions}
            allowFiltering={true}
            filterSettings={filterSettings}
          >
            <ColumnsDirective>
              {wishListGrid.map((item, index) => (
                <ColumnDirective key={'wishlist-item-' + index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject services={[Resize, Sort, ContextMenu, Filter, Page, Toolbar]} />
          </GridComponent>
        ) : (
          <div className='text-base text-[#f97316] font-bold tracking-normal text-center py-10'>No favorite car</div>
        )}
      </div>
    </div>
  )
}

export default WishList
