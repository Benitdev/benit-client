import axios from "axios"
import Cookies from "js-cookie"
import { cookies } from "next/headers"

const baseUrl = "http://localhost:5000/api/v1"
const getToken = () => {
  try {
    const token =
      Cookies.get("x-auth-cookies") ?? cookies().get("x-auth-cookies")?.value
    return token
  } catch (e) {
    return null
  }
}
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
      authorization: `Bearer ${getToken()}`,
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
