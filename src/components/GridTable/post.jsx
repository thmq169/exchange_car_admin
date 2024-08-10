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

const gridPostImage = (props) => (
  <div>
    <img className='rounded-xl h-20 md:ml-3' src={props.car.car_galleries[0].gallery_url} alt='post-item' />
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

const gridPostDateCreated = (props) => (
  <span>{props.posted_at !== null ? moment(props.posted_at).format('DD/MM/YYYY') : '-'}</span>
)

const GridPostAction = (props) => {
  return (
    <Link
      to={`/${window.location.pathname.split('/').pop()}/${props.car.car_slug}`}
      className='text-white hover:bg-opacity-75 bg-[#f97316] py-2 px-4 capitalize rounded-lg text-md'
    >
      Detail
    </Link>
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
    <div className='flex justify-center items-center gap-2 relative'>
      <Link
        to={`/wishlist/${props.car.car_slug}`}
        className='text-white hover:bg-opacity-75 bg-[#f97316] py-2 px-4 capitalize rounded-lg text-md'
      >
        View Detail
      </Link>
      <TooltipComponent content='Remove wishlist' position='TopCenter' tabIndex={0}>
        <button
          onClick={() => handleRemoveWishList(props.id)}
          className='text-white hover:bg-opacity-75 bg-red-700 p-2 h-full capitalize rounded-lg text-md'
        >
          <FaTrashAlt className='w-full h-full' />
        </button>
      </TooltipComponent>
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
    headerText: 'Post ID',
    width: '80',
    textAlign: 'Center',
  },
  {
    field: 'car.car_name',
    headerText: 'Car',
    width: '150',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  { headerText: 'Customer', width: '150', textAlign: 'Center', template: gridPostCustomerFullName },
  {
    headerText: 'Date Posted',
    textAlign: 'Center',
    width: '100',
    template: gridPostDateCreated,
  },
  {
    headerText: 'Status',
    template: gridPostStatus,
    field: 'post_status',
    textAlign: 'Center',
    width: '100',
  },
  {
    headerText: 'Action',
    template: GridPostAction,
    textAlign: 'Center',
    width: '100',
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
