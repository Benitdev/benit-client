import axiosServer from "@/lib/axiosServer"
import { ResSuccess, TLesson } from "@/types"
import { TCourse } from "@/types"

const courseApi = {
  getCourses: (): Promise<TCourse[]> => axiosServer.get("/courses"),
  getCourseDetail: (slug: string): Promise<TCourse> =>
    axiosServer.get(`/courses/${slug}`),
  getLesson: (id: string): Promise<TLesson> =>
    axiosServer.get(`/courses/lessons/${id}`),
}

export default courseApi
