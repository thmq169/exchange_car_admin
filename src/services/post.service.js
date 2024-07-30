import axiosClient from './axios-client'
import { CREATE_POST, GET_LATEST_POST, GET_POST, GET_POSTS, GET_POSTS_USER, QUERY_TABLE } from './endpoint'

export const postsService = {
  getAllPosts: () => {
    return axiosClient.get(GET_POSTS)
  },
  getPost: (car_slug) => {
    return axiosClient.get(`${GET_POST}/${car_slug}`)
  },
  getLatestPost: () => {
    return axiosClient.get(GET_LATEST_POST)
  },
  queryTable: () => {
    return axiosClient.get(QUERY_TABLE)
  },
  createPost: ({ data }) => {
    return axiosClient.post(CREATE_POST, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
  },
  getPostsUser: ({ customer_id }) => {
    return axiosClient.get(GET_POSTS_USER + `/${customer_id}/all`)
  },
}
