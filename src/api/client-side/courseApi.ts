// import { LoginForm } from 'types';
import axiosClient from "@/lib/axiosClient"

const courseApi = {
  addCourse: (data: any) => axiosClient.post(`/courses`, data),
}

export default courseApi
