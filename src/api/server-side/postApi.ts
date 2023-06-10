import httpRequest from "@/lib/httpRequest"

import type { Page, ResSuccess, TPost } from "@/types"
import filterObj from "@/utils/filterObj"

type Filter = {
  categoryId?: string
  feature?: string
  authorId?: string
  status?: string
  likes?: string
  page?: number
}

const postApi = {
  getPost: (filter: Filter): Promise<Page<TPost[]>> => {
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

  getSimilarPosts: (filter: { categoryId: string[] }): Promise<TPost[]> => {
    const filteredObj = filterObj(filter)
    const queryString = new URLSearchParams(filteredObj).toString()
    return httpRequest(`/posts/similar?${queryString}`)
  },
}

export default postApi
