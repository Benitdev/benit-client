import Banner from "@/components/ui/Banner"
import CourseList from "@/components/ui/CourseList"
import PostList from "@/components/ui/PostList"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Benit | Home",
  description: "Welcome to Benit",
}

export default function HomePage() {
  return (
    <main className="minx-h-screen flex-1 overflow-hidden">
      <Banner />
      {/* @ts-expect-error Async Server Component */}
      <CourseList />
      <PostList />
    </main>
  )
}
