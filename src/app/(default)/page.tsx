import Heading from "@/components/common/Heading/Heading"
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
        <div className="min-h-[400px] space-y-4">
          <div className="flex items-end justify-between pr-10">
            <Heading flag="Free" className="w-fit">
              Khoá Học Miễn Phí
            </Heading>
            <Link
              href={"/courses"}
              className="group flex items-center gap-1 font-bold text-red-500 hover:underline"
            >
              Xem tất cả{" "}
              <IconChevronRight className="h-5 w-5 transition group-hover:translate-x-2" />
            </Link>
          </div>
          {/* @ts-expect-error Async Server Component */}
          <CourseList />
        </div>
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
          <PostList feature="featured" status="approved" type="home" />
        </Suspense>
      </section>
    </main>
  )
}
