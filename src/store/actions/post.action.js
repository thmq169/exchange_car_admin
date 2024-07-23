import { createAsyncThunk } from '@reduxjs/toolkit'
import { postsService } from '../../services/post.service'

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  try {
    const response = await postsService.getAllPosts()
    return response
  } catch (error) {
    console.log('Log - error:', error)
  }
})

export const getPost = createAsyncThunk('post/getPost', async (params, { rejectWithValue }) => {
  try {
    const response = await postsService.getPost(params.car_slug)
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})
