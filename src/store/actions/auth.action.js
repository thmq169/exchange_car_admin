import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/auth.service'

export const userLogin = createAsyncThunk('auth/login', async ({ phone, pwd }, { rejectWithValue }) => {
  try {
    const response = await authService.signIn({ phone, pwd })
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})
