import courseApi from "@/api/client-side/courseApi"
import authApi from "@/api/server-side/authApi"
import Header from "../_components/Header"
import CourseTrack from "../_components/CourseTrack"
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
} from "@tabler/icons-react"

type Props = {
  params: { slug: string }
  children: React.ReactNode
}

const LearningLayout = async ({ params: { slug }, children }: Props) => {
  const user = await authApi.getUser().catch(() => null)
  const course = await courseApi.getCourseDetail(slug)

  return (
    <div>
      <Header title={course.title} />
      <div className="flex">
        <div className="flex-[0.8]">{children}</div>
        <CourseTrack
          chapters={course.courseChapters}
          lessonsLearned={
            user?.courseLearned.find(
              (courseLearned) => courseLearned.course === course._id
            )?.lessons
          }
        />
      </div>
      <div className="fixed bottom-0 z-[99] w-full bg-black/80 py-2 backdrop-blur-sm">
        <div className="mx-auto flex w-fit gap-8">
          <button className="group flex items-center gap-4 p-2 px-6">
            <IconArrowBigLeftFilled className="h-6 w-6 transition-all group-hover:-translate-x-5" />
            <span className="font-bold group-hover:text-pink-500">
              Bài trước
            </span>
          </button>
          <button className="group flex items-center gap-4 rounded-lg border border-pink-700 p-2 px-6 text-pink-500">
            <span className="font-bold group-hover:text-pink-500">
              Bài tiếp thep
            </span>
            <IconArrowBigRightFilled className="h-6 w-6 transition-all group-hover:translate-x-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LearningLayout
