import Image from "next/image"

import { TPost } from "@/types"
import Link from "next/link"
import ButtonAuth from "../common/Button/ButtonAuth"
import { IconArrowRight } from "@tabler/icons-react"
import { formatDateTime } from "@/utils/dayUtil"

type Props = {
  post: TPost
}

export default function PostItem({ post }: Props) {
  return (
    <li className="mb-10 ml-4 space-y-4">
      <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-gray-500 bg-gray-500 " />
      <time className="mb-1 -translate-x-full text-sm font-normal leading-none text-gray-400 ">
        {formatDateTime(post.createdAt)}
      </time>
      <div className="flex gap-4">
        <div className="relative max-h-[300px] min-h-[200px] w-[250px] shrink-0 overflow-hidden rounded-xl">
          <Image src={post.image} alt="" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-3">
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
          <Link href={`/blogs/${post.slug}`} className="mt-auto w-fit">
            <ButtonAuth className="bg-black/50 px-6 py-2">
              Đọc thêm
              <IconArrowRight className="ml-2 h-4 w-4" />
            </ButtonAuth>
          </Link>
        </div>
      </div>
    </li>
  )
}
