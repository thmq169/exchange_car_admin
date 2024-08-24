import { AiOutlineAreaChart, AiOutlineBarChart, AiOutlineProfile, AiOutlineStock } from 'react-icons/ai'
import {
  FaAward,
  FaBookmark,
  FaCar,
  FaCarAlt,
  FaGem,
  FaRegAddressBook,
  FaRegCalendarAlt,
  FaUserAlt,
} from 'react-icons/fa'
import { FiPieChart } from 'react-icons/fi'
import { SiGoogleanalytics } from 'react-icons/si'

export const links = [
  {
    title: 'Dashboard',
    role: ['Admin'],
    links: [
      {
        name: 'analytics',
        icon: <SiGoogleanalytics />,
      },
    ],
  },

  {
    title: 'Pages',
    role: ['Admin'],
    links: [
      {
        name: 'posts',
        icon: <FaCarAlt />,
      },
      {
        name: 'customers',
        icon: <FaUserAlt />,
      },
      {
        name: 'calendars',
        icon: <FaRegCalendarAlt />,
      },
    ],
  },
  {
    title: 'Statistics',
    role: ['Admin'],
    links: [
      {
        name: 'brands',
        icon: <AiOutlineStock />,
      },
      {
        name: 'cities',
        icon: <AiOutlineAreaChart />,
      },

      {
        name: 'types',
        icon: <AiOutlineBarChart />,
      },
      {
        name: 'engines',
        icon: <FiPieChart />,
      },
    ],
  },
  {
    title: 'Your Information',
    role: ['Individual Customer'],
    links: [
      {
        name: 'cars',
        icon: <FaCar />,
      },
      {
        name: 'wishlist',
        icon: <FaBookmark />,
      },
      {
        name: 'profile',
        icon: <AiOutlineProfile />,
      },
    ],
  },
  {
    title: 'Your Works',
    role: ['Staff'],
    links: [
      {
        name: 'standard',
        icon: <FaRegAddressBook />,
      },
      {
        name: 'premium',
        icon: <FaAward />,
      },
      {
        name: 'vip',
        icon: <FaGem />,
      },
      {
        name: 'profile',
        icon: <AiOutlineProfile />,
      },
    ],
  },
]
