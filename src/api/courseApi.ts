// import { LoginForm } from 'types';
import axiosClient from "@/lib/axiosClient"
import { ResSuccess } from "@/types"
import { TCourse } from "@/types"

const courseApi = {
  addCourse: (data: any): Promise<ResSuccess> =>
    axiosClient.post(`/courses`, data),

  getCourse: (): Promise<TCourse[]> => axiosClient.get("/courses"),

  getCourseDetail: (slug: string): Promise<TCourse> =>
    axiosClient.get(`/courses/${slug}`),

  updateCourse: (formData: any): Promise<ResSuccess> => {
    const { _id, ...data } = formData
    return axiosClient.put(`/courses/${_id}`, data)
  },

  uploadImage: (file: File): Promise<any> => {
    const formData = new FormData()
    formData.append("image", file)
    console.log(file)
    return axiosClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
}

export default courseApi
