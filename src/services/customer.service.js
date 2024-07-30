import axiosClient from './axios-client'
import { UPDATE_PROFILE } from './endpoint'

export const customerService = {
  updateProfile: ({ data, access_token }) => {
    return axiosClient.patch(UPDATE_PROFILE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${access_token}`,
      },
    })
  },
}
