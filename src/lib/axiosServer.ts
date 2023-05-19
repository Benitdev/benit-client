import axios from "axios"
import { cookies } from "next/headers"

const baseUrl = "http://localhost:5000/api/v1"

const axiosServer = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosServer.interceptors.request.use((config: any) => {
  return {
    ...config,
    headers: {
      authorization: `Bearer ${cookies().get("x-auth-cookies")?.value}`,
    },
  }
})

axiosServer.interceptors.response.use(
  (response) => {
    if (response.data && response.data.data) return response.data.data
    return response.data
  },
  (err) => {
    throw err
  }
)

export default axiosServer
