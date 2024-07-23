import axiosClient from './axios-client'
import { LOGIN } from './endpoint'

export const authService = {
  signIn: ({ phone, pwd }) => {
    return axiosClient.post(LOGIN, { phone, pwd })
  },
}
