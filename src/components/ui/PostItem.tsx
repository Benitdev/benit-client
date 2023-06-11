import Image from "next/image"

import { TPost } from "@/types"
import Link from "next/link"
import ButtonAuth from "../common/Button/ButtonAuth"
import { IconArrowRight } from "@tabler/icons-react"
import { formatDateTime } from "@/utils/dayUtil"
import Tag from "../common/Tag/Tag"
import PostFavorite from "@/app/(default)/blogs/_components/PostFavorite"
import { cn } from "@/utils/cn"
import { STATUS } from "@/constants/status"

type Props = {
  post: TPost
}

export default function PostItem({ post }: Props) {
  const getButtonBgColor = (status: string) => {
    let bg: string = ""
    switch (status) {
      case "approved": {
        bg = "bg-green-500"
        break
      }
      case "rejects": {
        bg = "bg-red-500"
        break
      }
      case "pending": {
        bg = "bg-orange-500"
        break
      }
    }
    return bg
  }
  return (
    <li className="mb-10 ml-4 space-y-4">
      <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-gray-500 bg-gray-500 " />
      <time className="mb-1 -translate-x-full text-sm font-normal leading-none text-gray-400 ">
        {formatDateTime(post.createdAt)}
      </time>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative max-h-[300px] min-h-[200px] w-[250px] shrink-0 overflow-hidden rounded-xl">
          <Image src={post.image} alt="" fill className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">
            {post.title}
          </h3>
          <p className="mb-4 line-clamp-3 text-base font-normal text-gray-500 dark:text-gray-400">
            {post.description}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-bold text-pink-600">
              {post.authorId.fullName}
            </span>
            <span className="h-1 w-1 rounded-full bg-pink-600"></span>
            <span className="text-gray-400">{post.readingTime} phút đọc</span>
          </div>
          <div className="mt-auto flex w-full flex-col items-start justify-between gap-2 gap-y-4 lg:flex-row lg:items-center">
            <div className="flex w-fit shrink-0 items-center gap-2">
              {post.status === "approved" ? (
                <Link href={`/blogs/${post.slug}`}>
                  <ButtonAuth className="bg-black/50 px-6 py-2">
                    Đọc thêm
                    <IconArrowRight className="ml-2 h-4 w-4" />
                  </ButtonAuth>
                </Link>
              ) : (
                <span
                  className={cn(
                    "rounded-xl px-4 py-2 font-bold capitalize text-slate-900",
                    getButtonBgColor(post.status)
                  )}
                >
                  {STATUS[post.status as string].label}
                </span>
              )}
              <PostFavorite postId={post._id} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag._id} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
