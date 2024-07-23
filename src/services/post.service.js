import axiosClient from './axios-client'
import { GET_POST, GET_POSTS } from './endpoint'

export const postsService = {
  getAllPosts: () => {
    return axiosClient.get(GET_POSTS)
  },
  getPost: (car_slug) => {
    return axiosClient.get(`${GET_POST}/${car_slug}`)
  },
}
