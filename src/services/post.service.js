import axiosClient from './axios-client'
import {
  CREATE_DRAFT_POST,
  CREATE_PUBLISH_POST,
  DELETE_POST,
  GET_LATEST_POST,
  GET_POST,
  GET_POSTS,
  GET_POSTS_USER,
  QUERY_TABLE,
} from './endpoint'

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
    return axiosClient.post(CREATE_PUBLISH_POST, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
  },
  createDraftPost: ({ data }) => {
    return axiosClient.post(CREATE_DRAFT_POST, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
  },
  publishPost: ({ post_id, data, access_token }) => {
    return axiosClient.post(CREATE_PUBLISH_POST + `/${post_id}`, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  },
  getPostsUser: ({ customer_id }) => {
    return axiosClient.get(GET_POSTS_USER + `/${customer_id}/all`)
  },
  deletePost: ({ post_id, access_token }) => {
    return axiosClient.delete(DELETE_POST + `/${post_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  },
}
