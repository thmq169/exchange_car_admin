import { createSlice } from '@reduxjs/toolkit'
import { userLogin } from '../actions/auth.action'

const initialState = {
  loading: false,
  user: null,
  userToken: null,
  error: null,
  success: false,
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
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export const { setUser, setUserToken } = authSlice.actions

export const selectUser = (state) => state.auth.user

export default authSlice.reducer
