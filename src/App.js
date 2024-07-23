import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import {
  Analytics,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
  Posts,
  Cars,
  SignIn,
} from './pages'
import './App.css'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

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
          path: '/cars',
          element: <Cars />,
        },
        {
          path: '/employees',
          element: <Employees />,
        },
        {
          path: '/customers',
          element: <Customers />,
        },
        {
          path: '/line',
          element: <Line />,
        },
        {
          path: '/area',
          element: <Area />,
        },
        {
          path: '/bar',
          element: <Bar />,
        },
        {
          path: '/pie',
          element: <Pie />,
        },
        {
          path: '/financial',
          element: <Financial />,
        },
        {
          path: '/color-mapping',
          element: <ColorMapping />,
        },
        {
          path: '/pyramid',
          element: <Pyramid />,
        },
        {
          path: '/stacked',
          element: <Stacked />,
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
    </Provider>
  )
}

export default App
