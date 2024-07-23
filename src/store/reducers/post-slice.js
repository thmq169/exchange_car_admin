import { createSlice } from '@reduxjs/toolkit'
import { getPost, getPosts } from '../actions/post.action'

const initialState = {
  posts: [],
  post: {},
}

export const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setPost: (state, action) => {
      state.post = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload
    })
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.post = action.payload
    })
  },
})

export const { setPosts, setPost } = postSlice.actions

export const selectPosts = (state) => state.post.posts
export const selectPost = (state) => state.post.post

export default postSlice.reducer
