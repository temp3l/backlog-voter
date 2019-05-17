import axios from 'axios'
import { getToken } from  './auth'

const api = axios.create({
  baseURL: '/api',
  'Content-Type': 'application/json'
})

api.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api