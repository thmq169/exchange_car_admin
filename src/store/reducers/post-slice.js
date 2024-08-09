import { createSlice } from '@reduxjs/toolkit'
import { getLatestPost, getPost, getPosts, getPostsUser, getQueryTable } from '../actions/post.action'

const initialState = {
  posts: [],
  post: null,
  latestPost: [],
  queryTable: null,
  postsUser: null,
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
    setLatestPost: (state, action) => {
      state.latestPost = action.payload
    },
    setQueryTable: (state, action) => {
      state.queryTable = action.payload
    },
    addPost: (state, action) => {
      state.posts = [...state.posts, action.payload]
    },
    setPostsUser: (state, action) => {
      state.postsUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload
    })
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.post = action.payload
    })
    builder.addCase(getLatestPost.fulfilled, (state, action) => {
      state.latestPost = action.payload
    })
    builder.addCase(getQueryTable.fulfilled, (state, action) => {
      state.queryTable = action.payload
    })
    builder.addCase(getPostsUser.fulfilled, (state, action) => {
      state.postsUser = action.payload
    })
  },
})

export const { setPosts, setPost, setLatestPost, setQueryTable, addPost, setPostsUser } = postSlice.actions

export const selectPosts = (state) => state.post.posts
export const selectPost = (state) => state.post.post
export const selectLatestPost = (state) => state.post.latestPost
export const selectQueryTable = (state) => state.post.queryTable
export const selectPostsUser = (state) => state.post.postsUser

export default postSlice.reducer
