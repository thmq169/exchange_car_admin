import { useEffect, useMemo } from 'react'
import { selectPosts } from '../store/reducers/post-slice'
import { useAppDispatch, useAppSelector } from './hook'
import { getPosts } from '../store/actions/post.action'

const useGetData = () => {
  const dispatch = useAppDispatch()

  const posts = useAppSelector(selectPosts)

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

  return useMemo(() => ({ posts }), [posts])
}

export default useGetData
