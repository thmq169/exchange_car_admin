import { useEffect, useMemo } from 'react'
import { selectLatestPost, selectPost, selectPosts, selectQueryTable } from '../store/reducers/post-slice'
import { useAppDispatch, useAppSelector } from './hook'

import { selectBrands } from '../store/reducers/car-slice'
import { getBrands } from '../store/actions/car.action'
import { getLatestPost, getPosts, getQueryTable } from '../store/actions/post.action'
import { selectUser } from '../store/reducers/auth-slice'
import { useNavigate } from 'react-router-dom'

const useGetData = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const brands = useAppSelector(selectBrands)
  const posts = useAppSelector(selectPosts)
  const post = useAppSelector(selectPost)
  const queryTable = useAppSelector(selectQueryTable)
  const latestPost = useAppSelector(selectLatestPost)
  const user = useAppSelector(selectUser)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        await dispatch(getPosts())
      } catch (error) {
        console.log('Log - error:', error)
      }
    }
    if (posts.length === 0) {
      fetchPost()
    }
  }, [posts, dispatch])

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        await dispatch(getLatestPost())
      } catch (error) {
        console.log('Log - error:', error)
      }
    }
    if (latestPost.length === 0) {
      fetchLatestPost()
    }
  }, [latestPost, dispatch])

  useEffect(() => {
    const fetchQueryTable = async () => {
      try {
        await dispatch(getQueryTable())
      } catch (error) {
        console.log('Log - error:', error)
      }
    }
    if (queryTable === null) {
      fetchQueryTable()
    }
  }, [queryTable, dispatch])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        await dispatch(getBrands())
      } catch (error) {
        console.log('Log - error:', error)
      }
    }
    if (brands.length === 0 || brands === null) {
      fetchBrands()
    }
  }, [brands, dispatch])

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const access_token = localStorage.getItem('access_token')
  //       const userProfile = await authService.getProfile(access_token)
  //       dispatch(setUser(userProfile.data.data.currentUser))
  //     } catch (error) {
  //       // navigate('/sign-in')
  //       // localStorage.removeItem('access_token')
  //       console.log('Log - error:', error)
  //     }
  //   }
  //   if (user === null) {
  //     fetchUser()
  //   }
  // }, [user, dispatch])

  return useMemo(
    () => ({ posts, post, brands, latestPost, queryTable, user }),
    [posts, post, brands, latestPost, queryTable, user]
  )
}

export default useGetData
