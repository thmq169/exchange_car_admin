import { createSlice } from '@reduxjs/toolkit'
import { getBrands, getModels } from '../actions/car.action'

const initialState = {
  brands: [],
  models: [],
  variants: [],
}

const carSlice = createSlice({
  name: 'car',
  initialState: initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload
    },
    setModels: (state, action) => {
      state.models = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.brands = action.payload
    })
    builder.addCase(getModels.fulfilled, (state, action) => {
      state.models = action.payload
    })
  },
})

export const { setBrands, setModels } = carSlice.actions

export const selectBrands = (state) => state.car.brands
export const selectModels = (state) => state.car.models

export default carSlice.reducer
