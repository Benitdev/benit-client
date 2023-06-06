"use client"

import { useComment } from "@/hooks"
import CommentDetail from "./CommentDetail"
import { TUser } from "@/types"

type Props = {
  user: TUser
  postId: string
  reply?: string
  type?: "postId" | "lessonId"
}

export default function CommentList({ user, postId, type, reply }: Props) {
  const { data, isLoading } = useComment({ postId, reply, type })

  return (
    <ul className="space-y-4 rounded-xl bg-slate-900 p-4">
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        data?.map((comment) => (
          <CommentDetail
            key={comment._id}
            comment={comment}
            user={user}
            postId={postId}
            type={type}
          />
        ))
      )}
    </ul>
  )
}
