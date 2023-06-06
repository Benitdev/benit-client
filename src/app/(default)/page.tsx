import Heading from "@/components/common/Heading"
import PostListSkeleton from "@/components/common/Skeleton/PostListSkeleton"
import Banner from "@/components/ui/Banner"
import CourseList from "@/components/ui/CourseList"
import PostList from "@/components/ui/PostList"
import { IconChevronRight } from "@tabler/icons-react"
import Link from "next/link"
import { Suspense } from "react"

export default function HomePage() {
  return (
    <main>
      <Banner />
      <section className="relative p-10 shadow-inner">
        <div className="min-h-[500px] space-y-4">
          <Heading flag="Free">Khoá Học Miễn Phí</Heading>
          {/* @ts-expect-error Async Server Component */}
          <CourseList />
        </div>
        <div className="absolute left-11 top-[15%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/70 bg-gradient-to-tr blur-[200px]"></div>
        <div className="absolute bottom-[15%] right-11 -z-10 h-24 w-[40rem] rotate-45 bg-purple-600/60 bg-gradient-to-tr blur-[120px]"></div>
        <div className="absolute right-0 top-0 -z-10 h-[30rem] w-[30rem] -translate-y-1/2 translate-x-1/2 rotate-45 bg-orange-700/30 bg-gradient-to-tr blur-[100px]"></div>
        <div className="bg-grid absolute inset-0 -z-10"></div>
      </section>

      <section className="relative p-10">
        <div className="flex items-end justify-between pr-10">
          <Heading>Bài viết nổi bật</Heading>
          <Link
            href={"/blogs"}
            className="group flex items-center gap-1 font-bold text-red-500 hover:underline"
          >
            Xem tất cả{" "}
            <IconChevronRight className="h-5 w-5 transition group-hover:translate-x-2" />
          </Link>
        </div>
        <Suspense fallback={<PostListSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <PostList feature="featured" />
        </Suspense>

        <div className="absolute left-11 top-[50%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/70 bg-gradient-to-tr blur-[200px]"></div>
      </section>
    </main>
  )
}
