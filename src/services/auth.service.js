import axiosClient from './axios-client'
import { GET_PROFILE, LOGIN, UPDATE_PASSWORD } from './endpoint'

export const authService = {
  signIn: ({ mobile_phone, password }) => {
    return axiosClient.post(LOGIN, { mobile_phone, password })
  },
  getProfile: (access_token) => {
    return axiosClient.get(GET_PROFILE, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  },
  updatePassword: ({ data, access_token }) => {
    return axiosClient.post(`${UPDATE_PASSWORD}`, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  },
}
