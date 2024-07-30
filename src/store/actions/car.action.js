import { createAsyncThunk } from '@reduxjs/toolkit'
import { carService } from '../../services/car.service'

export const getBrands = createAsyncThunk('car/brands', async () => {
  try {
    const response = await carService.getBrands()
    return response.data.data
  } catch (error) {
    console.log(error)
  }
})

export const getModels = createAsyncThunk('car/models', async (params, { rejectWithValue }) => {
  try {
    const response = await carService.getModels({ brand_name: params.brand_name })
    return response.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
})
