import httpRequest from "@/lib/httpRequest"
import { ResSuccess, TComment } from "@/types"

const commentApi = {
  getComments: async ({
    courseId,
    postId,
  }: {
    courseId?: string
    postId?: string
  }): Promise<TComment[]> =>
    httpRequest(`/comments`, {
      next: {
        revalidate: 60,
      },
    }),
}

export default commentApi
