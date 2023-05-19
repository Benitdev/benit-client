import courseApi from "@/api/client-side/courseApi"
import authApi from "@/api/server-side/authApi"
import Header from "../_components/Header"
import CourseTrack from "../_components/CourseTrack"

type Props = {
  params: { slug: string }
  children: React.ReactNode
}

const LearningLayout = async ({ params: { slug }, children }: Props) => {
  const user = await authApi.getUser().catch(() => {})
  const course = await courseApi.getCourseDetail(slug)
  return (
    <div>
      <Header title={course.title} />
      <div className="flex">
        <div className="flex-[0.8]">{children}</div>
        <CourseTrack chapters={course.courseChapters} />
      </div>
    </div>
  )
}

export default LearningLayout
