import parse from "html-react-parser"

import Avatar from "@/components/ui/Avatar"
import { TComment, TUser } from "@/types"
import Link from "next/link"
import { formatDateTime } from "@/utils/dayUtil"
import { useState } from "react"
import CommentInput from "./CommentInput"
import { cn } from "@/utils/cn"
import CommentList from "./CommentList"

type Props = {
  comment: TComment
  user: TUser
  postId: string
  type?: "postId" | "lessonId"
}

export default function CommentDetail({ comment, user, postId, type }: Props) {
  const [toggleReply, setToggleReply] = useState<boolean>(false)
  const [toggleShowReply, setToggleShowReply] = useState<boolean>(false)

  return (
    <div className="flex items-start gap-2">
      <div className="shrink-0">
        <Avatar avatar={comment.authorId.avatar} />
      </div>
      <div className="space-y-2">
        <div className="w-fit space-y-2 rounded-2xl bg-slate-800 px-5 py-3">
          <Link href={"/"} className="text-sm font-bold">
            {comment.authorId.fullName}
          </Link>
          <article className="ck">{parse(comment.content)}</article>
        </div>
        <div className="flex items-center gap-4 px-4 text-sm">
          <button className="hover:text-pink-600">Thích</button>
          <button
            onClick={() => setToggleReply((prev) => !prev)}
            className={cn(
              toggleReply && "font-bold text-pink-700",
              "hover:text-pink-600"
            )}
          >
            Phản hồi
          </button>
          <span>{formatDateTime(comment.createdAt)}</span>
        </div>
        {toggleReply && (
          <CommentInput
            user={user}
            postId={postId}
            reply={comment._id}
            type={type}
          />
        )}

        {comment.allReplies ? (
          toggleShowReply ? (
            <CommentList
              postId={postId}
              user={user}
              reply={comment._id}
              type={type}
            />
          ) : (
            <button
              className="text-slate-400"
              onClick={() => setToggleShowReply((prev) => !prev)}
            >
              {comment.allReplies} phản hồi
            </button>
          )
        ) : null}
      </div>
    </div>
  )
}
