import Banner from "@/components/layouts/Banner"
import CourseList from "@/components/layouts/CourseList"
import PostList from "@/components/layouts/PostList"

export default function Page() {
  return (
    <main className="minx-h-screen flex-1 overflow-hidden">
      <Banner />
      <CourseList />
      <PostList />
    </main>
  )
}
