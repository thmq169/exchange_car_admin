import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  customerBuy: [],
}

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setCustomerBuy: (state, action) => {
      state.customerBuy = action.payload
    },
  },
})

export const { setCustomerBuy } = staffSlice.actions

export const selectCustomerBuy = (state) => state.staff.customerBuy

export default staffSlice.reducer
