"use client"

import { useState } from "react"

import ButtonAuth from "@/components/common/Button/ButtonAuth"
import Editor from "@/components/ui/Editor"
import { TUser } from "@/types"
import { useMutateComment } from "@/hooks"
import { cn } from "@/utils/cn"

type Props = {
  user: TUser
  postId?: string
  type?: "postId" | "lessonId"
  reply?: string
}

export default function CommentInput({ user, postId, type, reply }: Props) {
  const [content, setContent] = useState<string>("")

  const mutation = useMutateComment({
    onSuccess: () => {
      setContent("")
    },
  })
  const onSubmit = () => {
    if (content)
      mutation.mutate({
        content,
        [type as string]: postId,
        reply,
      })
  }
  return (
    <div className={cn(reply && "border border-slate-200/30 p-4")}>
      {user ? <Editor data={content} setContent={setContent} /> : null}
      <ButtonAuth className="ml-auto mt-2 text-pink-600" onClick={onSubmit}>
        Bình luận
      </ButtonAuth>
    </div>
  )
}
