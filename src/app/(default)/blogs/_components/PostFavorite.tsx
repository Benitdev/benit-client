"use client"

import { usePathname, useRouter } from "next/navigation"

import { useFavoritePost, useLikedPost } from "@/hooks"
import { cn } from "@/utils/cn"
import { IconHeartFilled } from "@tabler/icons-react"

type Props = {
  postId: string
  refetch?: boolean
}

export default function PostFavorite({ postId, refetch = true }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  const { data } = useLikedPost(postId)

  const mutation = useFavoritePost({
    postId,
    onSuccess: () => {
      if (refetch && pathname !== "/") router.refresh()
    },
  })

  return (
    <button
      onClick={() =>
        mutation.mutate({ id: postId, action: data?.liked ? "remove" : "add" })
      }
    >
      <IconHeartFilled
        className={cn(
          "h-5 w-5 text-slate-500 hover:text-pink-600",
          data?.liked && "text-pink-600"
        )}
      />
    </button>
  )
}
