// import { LoginForm } from 'types';
import httpRequest from "@/lib/httpRequest"

import type { ResSuccess, TPost } from "@/types"

const postApi = {
  getPost: (): Promise<TPost[]> => httpRequest("/posts"),
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
