import authApi from "@/api/server-side/authApi"
import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"
import HeadingCloseTag from "@/components/common/Heading/HeadingCloseTag"
import PostList from "@/components/ui/PostList"
import { cn } from "@/utils/cn"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"

type Props = {
  searchParams: {
    type?: string
  }
}

export default async function MyFavoritePage({ searchParams }: Props) {
  const user = await authApi.getUser()
  if (!user) notFound()

  const type = searchParams.type ?? "blog"

  return (
    <div className="relative p-8">
      <BreadCrumb
        segments={[
          {
            title: "Trang chủ",
            url: "/",
          },
          {
            title: "Danh mục yêu thích của tôi",
          },
        ]}
      />
      <div className="mt-6 space-y-4">
        <HeadingCloseTag>{"<Danh mục yêu thích />"}</HeadingCloseTag>
        <p>Những thứ bạn thích nằm đây nha.</p>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <Link href={"/my-favorite?type=blog"}>
          <button
            className={cn(
              "font-bold hover:text-pink-600",
              type === "blog" &&
                "font-bold text-pink-600 underline underline-offset-1"
            )}
          >
            Bài viết
          </button>
        </Link>
        <Link href={"/my-favorite?type=ui"}>
          <button
            className={cn(
              "font-bold hover:text-pink-600",
              type === "ui" &&
                "font-bold text-pink-600 underline underline-offset-1"
            )}
          >
            UI Template
          </button>
        </Link>
      </div>
      {/* @ts-expect-error Async Server Component */}
      {type === "blog" && <PostList userFavorite={user._id} />}
    </div>
  )
}
