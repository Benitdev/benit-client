import Banner from "@/components/layouts/Banner"
import CourseList from "@/components/layouts/CourseList"
import PostList from "@/components/layouts/PostList"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Benit | Home",
  description: "Welcome to Benit",
}

export default function Page() {
  return (
    <main className="minx-h-screen flex-1 overflow-hidden">
      <Banner />
      <CourseList />
      <PostList />
    </main>
  )
}
