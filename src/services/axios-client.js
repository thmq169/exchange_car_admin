import axios from 'axios'

const baseURL = 'https://exchangecar-be.nguyennhuthuy.com/'

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.response.use(
  (response) => {
    return response?.data
  },
  (error) => {
    console.error('Error response:', error.response)
    return Promise.reject(error)
  }
)

export default axiosClient
