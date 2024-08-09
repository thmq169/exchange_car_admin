import { createAsyncThunk } from '@reduxjs/toolkit'
import { customerService } from '../../services/customer.service'

export const getUserWishList = createAsyncThunk('auth/user', async ({ access_token }, { rejectWithValue }) => {
  try {
    const response = await customerService.getWishList(access_token)
    return response.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
})
