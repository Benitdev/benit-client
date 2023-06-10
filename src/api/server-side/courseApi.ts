import httpRequest from "@/lib/httpRequest"
import { ResSuccess, TCategory, TLesson } from "@/types"
import { TCourse } from "@/types"
import filterObj from "@/utils/filterObj"

type Filter = {
  categoryId?: string
  status?: string
  type?: "frontend" | "backend"
}

const courseApi = {
  getCourses: async (filter: Filter): Promise<TCourse[]> => {
    const filteredObj = filterObj(filter)
    const queryString = new URLSearchParams(filteredObj).toString()

    return httpRequest(`/courses?${queryString}`, {
      next: {
        revalidate: 60,
      },
    })
  },

  getCourseDetail: async (slug: string): Promise<TCourse> =>
    httpRequest(`/courses/${slug}`, { cache: "no-store" }),

  getLesson: async (id: string): Promise<TLesson> =>
    httpRequest(`/courses/lessons/${id}`),

  getCourseCategories: (): Promise<TCategory[]> =>
    httpRequest(`/categories?type=course`, {
      next: {
        revalidate: 60,
      },
    }),
}

export default courseApi
