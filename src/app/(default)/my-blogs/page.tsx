import { notFound } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"

import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"
import Heading from "@/components/common/Heading/Heading"
import PostFilter from "../blogs/_components/PostFilter"
import PostListSkeleton from "@/components/common/Skeleton/PostListSkeleton"
import PostList from "@/components/ui/PostList"
import authApi from "@/api/server-side/authApi"
import Button from "@/components/common/Button"

type Props = {
  searchParams: {
    id: string
  }
}

export default async function MyBlogsPage({ searchParams }: Props) {
  const user = await authApi.getUser()
  if (!user) notFound()

  return (
    <div className="relative p-8">
      <BreadCrumb
        segments={[
          {
            title: "Trang chủ",
            url: "/",
          },
          {
            title: "Bài viết của tôi",
          },
        ]}
      />
      <div className="space-y-6">
        <div className="space-y-4 py-6 lg:pr-5">
          <Heading className="text-center">Bài viết của tôi</Heading>
          <p className="text-center">
            Nơi chia sẽ những kiến thức bổ ích về IT và các lĩnh vực công nghệ
            khác ...
          </p>
        </div>
        <Link href={"/new-blog"} className="mx-auto block w-fit">
          <Button
            classStroke="stroke-pink-600"
            small
            className="sticky top-0 z-10 bg-pink-600/90"
          >
            Viết blog
          </Button>
        </Link>
        {/* @ts-expect-error Async Server Component */}
        <PostFilter categoryId={searchParams.id} type="my-blogs" />
        <Suspense fallback={<PostListSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <PostList categoryId={searchParams.id} type="my-blogs" />
        </Suspense>
      </div>
    </div>
  )
}
