import axios from "axios"
import Cookies from "js-cookie"

const baseUrl = "http://localhost:5000/api/v1"
const getToken = () => Cookies.get("x-auth-cookies")
const axiosClient = axios.create({
  baseURL: baseUrl,
})

axiosClient.interceptors.request.use((config: any) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
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
    if (!err.response) {
      return alert(err)
    }
    throw err.response
  }
)

export default axiosClient
