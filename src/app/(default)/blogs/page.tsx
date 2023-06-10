import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"
import Heading from "@/components/common/Heading/Heading"
import PostList from "@/components/ui/PostList"
import React, { Suspense } from "react"
import PostFilter from "./_components/PostFilter"
import PostListSkeleton from "@/components/common/Skeleton/PostListSkeleton"

type Props = {
  searchParams: {
    id: string
    page: string
  }
}

const BlogPage = ({ searchParams }: Props) => {
  return (
    <div className="relative p-8">
      <BreadCrumb
        segments={[
          {
            title: "Trang chủ",
            url: "/",
          },
          {
            title: "Bài viết",
          },
        ]}
      />
      <div className="space-y-6">
        <div className="space-y-4 py-6 lg:pr-5">
          <Heading className="text-center">Tất cả bài viết</Heading>
          <p className="text-center">
            Các khóa học được thiết kế phù hợp cho cả người mới, nhiều khóa học
            miễn phí, chất lượng, nội dung dễ hiểu.
          </p>
        </div>
        {/* @ts-expect-error Async Server Component */}
        <PostFilter categoryId={searchParams.id} />
        <Suspense fallback={<PostListSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <PostList
            categoryId={searchParams.id}
            status="approved"
            page={Number(searchParams.page ?? 1)}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default BlogPage
