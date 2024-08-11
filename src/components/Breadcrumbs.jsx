import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/hook'
import { selectUser } from '../store/reducers/auth-slice'

const Breadcrumbs = () => {
  const location = useLocation()

  const user = useAppSelector(selectUser)

  const pathnames = location.pathname.split('/').filter((x) => x)
  let breadcrumbPath = ''

  console.log(user)

  return (
    user && (
      <div className=' text-[#f97316] font-semibold text-lg'>
        <Link to={user.user_roles.includes('Admin') ? '/analytics' : '/cars'} className='hover:underline'>
          Home{' '}
        </Link>
        {pathnames.map((name, index) => {
          breadcrumbPath += `/${name}`
          const isLast = index === pathnames.length - 1

          name = name.replace('_', ' ')
          name = name.replace('-', ' ')

          return isLast ? (
            <span key={breadcrumbPath} className='capitalize '>
              {' '}
              / {name}
            </span>
          ) : (
            <span key={breadcrumbPath}>
              {' '}
              /{' '}
              <Link to={breadcrumbPath} className='capitalize hover:underline'>
                {name}
              </Link>
            </span>
          )
        })}
      </div>
    )
  )
}

export default Breadcrumbs
