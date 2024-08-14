import { createSlice } from '@reduxjs/toolkit'
import { getUserProfile, userLogin } from '../actions/auth.action'

const initialState = {
  loading: false,
  user: null,
  userToken: null,
  error: null,
  success: false,
  avatar: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setUserAvatar: (state, action) => {
      state.avatar = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.userToken = action.payload
    })
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export const { setUser, setUserToken, setLoading, setUserAvatar } = authSlice.actions

export const selectUser = (state) => state.auth.user
export const selectUserToken = (state) => state.auth.userToken
export const selectAvatar = (state) => state.auth.avatar

export default authSlice.reducer
