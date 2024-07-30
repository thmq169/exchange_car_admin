import moment from 'moment/moment'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const gridPostImage = (props) => (
  <div>
    <img className='rounded-xl h-20 md:ml-3' src={props.car.car_galleries[0].gallery_url} alt='post-item' />
  </div>
)

const gridPostStatus = (props) => {
  const statusColorMap = {
    Posted: '#8BE78B',
    Pending: '#FEC90F',
    Cancel: 'red',
    'Wait to pay': '#FEC90F',
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
      to={`/posts/${props.car.car_slug}`}
      className='text-white hover:bg-opacity-75 bg-[#f97316] py-2 px-4 capitalize rounded-lg text-md'
    >
      Update
    </Link>
  )
}

GridPostAction.propTypes = {
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
  // {
  //   headerText: 'Action',
  //   template: GridPostAction,
  //   textAlign: 'Center',
  //   width: '100',
  // },
]
