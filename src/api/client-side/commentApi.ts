// import { LoginForm } from 'types';
import axiosClient from "@/lib/axiosClient"

import type { ResSuccess, TComment } from "@/types"

export type CommentFilter = {
  courseId?: string
  postId?: string
  reply?: string
  type?: string
}

const commentApi = {
  getComments: (filter: CommentFilter): Promise<TComment[]> =>
    axiosClient.get("/comments", {
      params: filter,
    }),
  postComment: (data: any): Promise<ResSuccess> =>
    axiosClient.post("/comments", data),
}

export default commentApi
