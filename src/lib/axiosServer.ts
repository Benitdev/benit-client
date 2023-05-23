import { cookies } from "next/headers"

import { BASE_API_URL } from "@/configs/env"
import axios from "axios"

const baseUrl = BASE_API_URL

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
