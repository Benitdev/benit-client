import axios from "axios"
import Cookies from "js-cookie"

const baseUrl = "http://localhost:5000/api/v1"

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosClient.interceptors.request.use((config: any) => {
  return {
    ...config,
    headers: {
      authorization: `Bearer ${Cookies.get("x-auth-cookies")}`,
    },
  }
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.data) return response.data.data
    return response.data
  },
  (err) => {
    throw err
  }
)

export default axiosClient
