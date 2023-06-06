import { TUser } from "./user"

export type TComment = {
  _id: string
  postId?: string
  courseId?: string
  authorId: TUser
  reply: string
  allReplies: number
  content: string
  createdAt: string
  updatedAt: string
}
