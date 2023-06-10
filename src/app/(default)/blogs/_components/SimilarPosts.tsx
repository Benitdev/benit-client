import postApi from "@/api/server-side/postApi"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/avatar"
import { TPost } from "@/types"
import React from "react"

type Props = {
  tags: TPost["tags"]
}

export default async function SimilarPosts({ tags }: Props) {
  const similarPosts = await postApi.getSimilarPosts({
    categoryId: tags.map((tag) => tag._id),
  })

  return (
    <div className="space-y-4">
      {similarPosts?.map((post) => (
        <div
          key={post._id}
          className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-slate-900/50"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={post.image} alt="Avatar" />
            <AvatarFallback>{post.title.slice(2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{post.title}</p>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {post.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
