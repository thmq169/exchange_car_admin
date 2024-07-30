import { createAsyncThunk } from '@reduxjs/toolkit'
import { postsService } from '../../services/post.service'

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  try {
    const response = await postsService.getAllPosts()
    return response.data.data.car_posts
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

export const getLatestPost = createAsyncThunk('post/getLatestPost', async () => {
  try {
    const response = await postsService.getLatestPost()
    return response.data.data.latestPosts
  } catch (error) {
    console.log('Log - error:', error)
  }
})

export const getQueryTable = createAsyncThunk('post/getQueryTable', async () => {
  try {
    const response = await postsService.queryTable()
    return response.data.data.query_table
  } catch (error) {
    console.log('Log - error:', error)
  }
})

export const getPostsUser = createAsyncThunk('post/getPostsUser', async (params, { rejectWithValue }) => {
  try {
    const response = await postsService.getPostsUser({ customer_id: params.customer_id })
    return response.data.data.car_posts
  } catch (error) {
    return rejectWithValue(error)
  }
})
