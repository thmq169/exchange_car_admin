import moment from 'moment/moment'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaTrashAlt } from 'react-icons/fa'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { showToastError, showToastSuccess } from '../../helpers'
import { customerService } from '../../services/customer.service'
import { getLocalStorageAcceToken } from '../../utils'
import { useDispatch } from 'react-redux'
import { setWishList } from '../../store/reducers/customer-slice'
import ModalConfirmDelete from '../ModalConfirmDelete'
import { useState } from 'react'
import { useAppSelector } from '../../hooks/hook'
import { selectUser } from '../../store/reducers/auth-slice'

const gridPostImage = (props) => (
  <div>
    <img className='rounded-xl h-20 md:ml-3' src={props.car.car_galleries[0].gallery_url} alt='post-item' />
  </div>
)

const gridUserImage = (props) => (
  <div>
    <img
      className='rounded-xl h-20 md:ml-3'
      src={
        props.customer && props.customer.avatar_url !== null
          ? props.customer.avatar_url
          : '/images/profile/default_avatar.jpg'
      }
      alt='post-item'
    />
  </div>
)

export const gridPostStatus = (props) => {
  const statusColorMap = {
    Posted: '#8BE78B',
    Pending: '#FEC90F',
    Cancel: 'red',
    'Wait to pay': '#FEC90F',
    Draft: '#DBDBDB',
    Active: '#8BE78B',
    Expired: 'red',
  }

  return (
    <button
      type='button'
      style={{ background: statusColorMap[props.post_status] }}
      className={'text-white py-1 px-2 capitalize rounded-2xl text-md' + statusColorMap[props.post_status]}
    >
      {props.post_status}
    </button>
  )
}

const gridPostCustomerFullName = (props) => (
  <span>
    {props.customer.first_name} {props.customer.last_name}
  </span>
)

const gridCustomerEmail = (props) => <span>{props.customer.email !== null ? props.customer.email : '-'}</span>

const gridPostDateCreated = (props) => (
  <span>{props.posted_at !== null ? moment(props.posted_at).format('DD/MM/YYYY') : '-'}</span>
)

const gridPostDateExpired = (props) => (
  <span>{props.expired_at !== null ? moment(props.expired_at).format('DD/MM/YYYY') : '-'}</span>
)

const GridPostAction = (props) => {
  const [showModalDelete, setShowModalDelete] = useState(false)
  const user = useAppSelector(selectUser)

  const path =
    user && user.user_roles.includes('Admin')
      ? `customers/${props.customer.id}`
      : window.location.pathname.split('/').pop()

  return (
    <div className='flex gap-1 justify-center'>
      <Link
        to={`/${path}/${props.car.car_slug}`}
        className='text-white hover:bg-opacity-75 bg-[#f97316] py-2 px-4 capitalize rounded-lg text-md'
      >
        Detail
      </Link>
      {user && user.user_roles.includes('Individual Customer') && (
        <>
          <TooltipComponent
            content={`Delete ${props.car.car_name}`}
            position='TopCenter'
            tabIndex={0}
            onClick={() => setShowModalDelete(true)}
          >
            <button className='text-white hover:bg-opacity-75 bg-red-700 py-2 px-3 h-full capitalize rounded-lg text-md'>
              <FaTrashAlt className='w-full h-full' />
            </button>
          </TooltipComponent>
          {showModalDelete && <ModalConfirmDelete setShow={setShowModalDelete} data={props} />}
        </>
      )}
    </div>
  )
}

const GridWishListAction = (props) => {
  const dispatch = useDispatch()
  const handleRemoveWishList = async (post_id) => {
    try {
      const res = await customerService.removeWishList({ post_id: post_id, access_token: getLocalStorageAcceToken() })
      showToastSuccess({ message: 'Remove from wishlist success!' })
      dispatch(setWishList(res.data.data))
    } catch (error) {
      showToastError({ message: error.message })
    }
  }

  return (
    <div className='flex gap-2'>
      <Link
        to={`/wishlist/${props.car.car_slug}`}
        className='text-white hover:bg-opacity-75 bg-[#f97316] py-2 px-4 capitalize rounded-lg text-md'
      >
        View Detail
      </Link>
      <TooltipComponent content='Remove wishlist' position='TopCenter' tabIndex={0}>
        <button
          onClick={() => handleRemoveWishList(props.id)}
          className='text-white hover:bg-opacity-75 bg-red-700 py-2 px-3 h-full capitalize rounded-lg text-md'
        >
          <FaTrashAlt className='w-full h-full' />
        </button>
      </TooltipComponent>
    </div>
  )
}

const GridCustomerAction = (props) => {
  return (
    <div className='flex gap-1 justify-center'>
      <Link
        to={`/customers/${props.customer.id}`}
        className='text-white hover:bg-opacity-75 bg-[#f97316] py-2 px-4 capitalize rounded-lg text-md'
      >
        Detail
      </Link>
    </div>
  )
}

GridPostAction.propTypes = {
  car: PropTypes.shape({
    car_slug: PropTypes.string.isRequired,
  }).isRequired,
}

GridWishListAction.propTypes = {
  car: PropTypes.shape({
    car_slug: PropTypes.string.isRequired,
  }).isRequired,
}

export const postGrid = [
  {
    headerText: 'Thumbnail',
    template: gridPostImage,
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'car.id',
    headerText: 'ID',
    width: '60',
    textAlign: 'Center',
  },
  {
    field: 'car.car_name',
    headerText: 'Car',
    width: '150',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  { headerText: 'Customer', width: '100', textAlign: 'Center', template: gridPostCustomerFullName },
  {
    headerText: 'Posted',
    textAlign: 'Center',
    width: '100',
    template: gridPostDateCreated,
  },
  {
    headerText: 'Expired',
    width: '100',
    template: gridPostDateExpired,
    textAlign: 'Center',
  },
  {
    field: 'days_displayed',
    headerText: 'Days Published',
    width: '80',
    textAlign: 'Center',
  },
  {
    headerText: 'Status',
    template: gridPostStatus,
    field: 'post_status',
    textAlign: 'Center',
    width: '80',
  },
  {
    headerText: 'Action',
    template: GridPostAction,
    textAlign: 'Center',
    width: '150',
  },
]

export const carGrid = [
  {
    headerText: 'Thumbnail',
    template: gridPostImage,
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'car.id',
    headerText: 'ID',
    width: '60',
    textAlign: 'Center',
  },
  {
    field: 'car.car_name',
    headerText: 'Car',
    width: '150',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  { headerText: 'Package', width: '100', textAlign: 'Center', field: 'package_option' },
  {
    headerText: 'Posted',
    textAlign: 'Center',
    width: '100',
    template: gridPostDateCreated,
  },
  {
    headerText: 'Expired',
    width: '100',
    template: gridPostDateExpired,
    textAlign: 'Center',
  },
  {
    field: 'days_displayed',
    headerText: 'Days Published',
    width: '80',
    textAlign: 'Center',
  },
  {
    headerText: 'Status',
    template: gridPostStatus,
    field: 'post_status',
    textAlign: 'Center',
    width: '80',
  },
  {
    headerText: 'Action',
    template: GridPostAction,
    textAlign: 'Center',
    width: '150',
  },
]

export const wishListGrid = [
  {
    headerText: 'Thumbnail',
    template: gridPostImage,
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'car.car_name',
    headerText: 'Car',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'car.car_brand',
    headerText: 'Brand',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'car.body_type',
    headerText: 'Body Type',
    width: '150',
    textAlign: 'Center',
  },
  // {
  //   headerText: 'Date Posted',
  //   textAlign: 'Center',
  //   width: '100',
  //   template: gridPostDateCreated,
  // },
  {
    headerText: 'Action',
    template: GridWishListAction,
    textAlign: 'Center',
    width: '100',
  },
]

export const customerGrid = [
  {
    headerText: 'Avatar',
    template: gridUserImage,
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'customer.first_name',
    headerText: 'First Name',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'customer.last_name',
    headerText: 'Last Name',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'customer.mobile_phone',
    headerText: 'Mobile Phone',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'customer.email',
    template: gridCustomerEmail,
    headerText: 'Email',
    width: '150',
    textAlign: 'Center',
  },
  {
    headerText: 'Action',
    template: GridCustomerAction,
    textAlign: 'Center',
    width: '100',
  },
]

export const customerBuyGrid = [
  {
    field: 'full_name',
    headerText: 'Buyer Full Name',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'phoneNumber',
    headerText: 'Mobile Phone',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'address',
    headerText: 'Address',
    width: '150',
    textAlign: 'Center',
  },
  // {
  //   headerText: 'Action',
  //   template: GridCustomerAction,
  //   textAlign: 'Center',
  //   width: '100',
  // },
]
