import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setLoading } = appSlice.actions

export const selectLoading = (state) => state.app.loading

export default appSlice.reducer
