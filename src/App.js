import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import {
  Analytics,
  Line,
  Area,
  Bar,
  Pie,
  Posts,
  SignIn,
  AddPost,
  Cars,
  Calendar,
  Customers,
  CarCustomer,
  StaffPosts,
  PostDetailStaff,
} from './pages'
import './App.css'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PostDetail from './pages/PostDetail'
import Profile from './pages/Profile'
import WishList from './pages/WishList'

const App = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Analytics />,
        },
        {
          path: '/analytics',
          element: <Analytics />,
        },
        {
          path: '/posts',
          element: <Posts />,
        },
        {
          path: '/customers',
          element: <Customers />,
        },
        {
          path: '/customers/:customer_id',
          element: <CarCustomer />,
        },
        {
          path: '/customers/:customer_id/:car_slug',
          element: <PostDetail />,
        },
        {
          path: '/posts/:car_slug',
          element: <PostDetail />,
        },
        {
          path: '/wishlist/:car_slug',
          element: <PostDetail />,
        },
        {
          path: '/cars/:car_slug',
          element: <PostDetail hideOwner />,
        },
        {
          path: '/cars/add-car',
          element: <AddPost />,
        },

        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/wishlist',
          element: <WishList />,
        },
        {
          path: '/brands',
          element: <Line />,
        },
        {
          path: '/cities',
          element: <Area />,
        },
        {
          path: '/types',
          element: <Bar />,
        },
        {
          path: '/engines',
          element: <Pie />,
        },
        {
          path: '/cars',
          element: <Cars />,
        },
        {
          path: '/calendars',
          element: <Calendar />,
        },
        {
          path: '/standard',
          element: <StaffPosts />,
        },
        {
          path: '/standard/:car_slug',
          element: <PostDetailStaff />,
        },
        {
          path: '/premium',
          element: <StaffPosts />,
        },
        {
          path: '/premium/:car_slug',
          element: <PostDetailStaff />,
        },
        {
          path: '/vip',
          element: <StaffPosts />,
        },
        {
          path: '/vip/:car_slug',
          element: <PostDetailStaff />,
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: '/sign-in',
          element: <SignIn />,
        },
      ],
    },
  ])

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  )
}

export default App
