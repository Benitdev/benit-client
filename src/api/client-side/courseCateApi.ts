// import { LoginForm } from 'types';
import axiosClient from "@/lib/axiosClient"

import type { TCourseCate, ResSuccess } from "@/types"

const courseCateApi = {
  getCourseCate: (): Promise<TCourseCate[]> =>
    axiosClient.get("/course-categories"),
  addCourseCate: (data: any): Promise<ResSuccess> =>
    axiosClient.post(`/course-categories`, { ...data, type: "course" }),
  updateCourseCate: (formData: any): Promise<ResSuccess> => {
    const { _id, ...data } = formData
    return axiosClient.patch(`/course-categories/${_id}`, data)
  },
}

export default courseCateApi
