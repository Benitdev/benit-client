import axiosServer from "@/lib/axiosServer"
import { ResSuccess } from "@/types"
import { TCourse } from "@/types"

const courseApi = {
  getCourse: (): Promise<TCourse[]> => axiosServer.get("/courses"),
  getCourseDetail: (slug: string): Promise<TCourse> =>
    axiosServer.get(`/courses/${slug}`),
}

export default courseApi
