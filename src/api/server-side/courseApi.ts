import httpRequest from "@/lib/httpRequest"
import { ResSuccess, TLesson } from "@/types"
import { TCourse } from "@/types"

const courseApi = {
  getCourses: async (): Promise<TCourse[]> =>
    httpRequest(`/courses`, {
      next: {
        revalidate: 60,
      },
    }),

  getCourseDetail: async (slug: string): Promise<TCourse> =>
    httpRequest(`/courses/${slug}`),

  getLesson: async (id: string): Promise<TLesson> =>
    httpRequest(`/courses/lessons/${id}`),
}

export default courseApi
