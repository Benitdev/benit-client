// import { LoginForm } from 'types';
import axiosClient from "@/lib/axiosClient"

const authApi = {
  addCourse: (data: any) => axiosClient.post(`/courses`, data),
}

export default authApi
