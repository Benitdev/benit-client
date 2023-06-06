import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"
import Heading from "@/components/common/Heading"
import PostFilter from "../blogs/_components/PostFilter"
import { Suspense } from "react"
import PostListSkeleton from "@/components/common/Skeleton/PostListSkeleton"
import PostList from "@/components/ui/PostList"
import authApi from "@/api/server-side/authApi"

type Props = {
  searchParams: {
    id: string
  }
}

export default async function MyBlogsPage({ searchParams }: Props) {
  const user = await authApi.getUser()

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
        {/* @ts-expect-error Async Server Component */}
        <PostFilter categoryId={searchParams.id} type="my-blogs" />
        <Suspense fallback={<PostListSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <PostList categoryId={searchParams.id} type="my-blogs" user={user} />
        </Suspense>
      </div>
      {/* background grid  */}
      <div className="absolute left-11 top-[15%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/70 bg-gradient-to-tr blur-[200px]"></div>
      <div className="absolute bottom-[15%] right-11 -z-10 h-24 w-[40rem] rotate-45 bg-purple-600/60 bg-gradient-to-tr blur-[120px]"></div>
      <div className="absolute right-0 top-0 -z-10 h-[30rem] w-[30rem] -translate-y-1/2 translate-x-1/2 rotate-45 bg-orange-700/30 bg-gradient-to-tr blur-[100px]"></div>
      <div className="bg-grid absolute inset-0 -z-10"></div>
    </div>
  )
}
