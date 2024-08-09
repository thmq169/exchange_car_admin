import { createSlice } from '@reduxjs/toolkit'
import { getUserWishList } from '../actions/customer.action'

const initialState = {
  wishlist: null,
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishlist = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserWishList.fulfilled, (state, action) => {
      state.wishlist = action.payload
    })
  },
})

export const { setWishList } = customerSlice.actions

export const selectWishList = (state) => state.customer.wishlist

export default customerSlice.reducer
