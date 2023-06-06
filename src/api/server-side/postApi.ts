import httpRequest from "@/lib/httpRequest"

import type { ResSuccess, TPost } from "@/types"
import filterObj from "@/utils/filterObj"

type Filter = {
  categoryId?: string
  feature?: string
  authorId?: string
  status?: string
  likes?: string
}

const postApi = {
  getPost: (filter: Filter): Promise<TPost[]> => {
    const filteredObj = filterObj(filter)
    const queryString = new URLSearchParams(filteredObj).toString()
    return httpRequest(`/posts?${queryString}`)
  },
  getPostDetail: (slug: string): Promise<TPost> =>
    httpRequest(`/posts/${slug}`, {
      next: {
        revalidate: 0,
      },
    }),

  getPostCategories: (): Promise<TPost[]> =>
    httpRequest(`/categories?type=blog`, {
      next: {
        revalidate: 60,
      },
    }),
}

export default postApi
