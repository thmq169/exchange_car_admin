import axiosClient from './axios-client'
import { GET_WISHLIST, REMOVE_WISHLIST, UPDATE_PROFILE } from './endpoint'

export const customerService = {
  updateProfile: ({ data, access_token }) => {
    return axiosClient.patch(UPDATE_PROFILE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${access_token}`,
      },
    })
  },
  getWishList: (access_token) => {
    return axiosClient.get(GET_WISHLIST, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${access_token}`,
      },
    })
  },
  removeWishList: ({ post_id, access_token }) => {
    return axiosClient.delete(REMOVE_WISHLIST + '/' + post_id, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${access_token}`,
      },
    })
  },
}
