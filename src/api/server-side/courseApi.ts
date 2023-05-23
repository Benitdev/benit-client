import { BASE_API_URL } from "@/configs/env"
import axiosServer from "@/lib/axiosServer"
import { ResSuccess, TLesson } from "@/types"
import { TCourse } from "@/types"

const courseApi = {
  getCourses: async (): Promise<TCourse[]> => {
    const res = await fetch(`${BASE_API_URL}/courses`)
    const { data } = await res.json()
    return data
  },

  getCourseDetail: async (slug: string): Promise<TCourse> => {
    const res = await fetch(`${BASE_API_URL}/courses/${slug}`)
    const { data } = await res.json()
    return data
  },
  getLesson: (id: string): Promise<TLesson> =>
    axiosServer.get(`/courses/lessons/${id}`),
}

export default courseApi
