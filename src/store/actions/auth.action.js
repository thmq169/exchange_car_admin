import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/auth.service'

export const userLogin = createAsyncThunk('auth/login', async ({ phone, pwd }, { rejectWithValue }) => {
  try {
    const response = await authService.signIn({ mobile_phone: '+84' + phone, password: pwd })
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getUserProfile = createAsyncThunk('auth/user', async ({ access_token }, { rejectWithValue }) => {
  try {
    const response = await authService.getProfile(access_token)
    return response.data.data.currentUser
  } catch (error) {
    return rejectWithValue(error)
  }
})
