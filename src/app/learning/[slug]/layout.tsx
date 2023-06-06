import { notFound } from "next/navigation"
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
} from "@tabler/icons-react"

import Header from "../_components/Header"
import CourseTrack from "../_components/CourseTrack"
import authApi from "@/api/server-side/authApi"
import courseApi from "@/api/server-side/courseApi"
import { calcTimeCourse, calcTimeLearned } from "@/utils/calcTimeCourse"

type Props = {
  params: { slug: string }
  children: React.ReactNode
}

const LearningLayout = async ({ params: { slug }, children }: Props) => {
  const courseRes = courseApi.getCourseDetail(slug)
  const userRes = authApi.getUser()

  const [course, user] = await Promise.all([courseRes, userRes])

  if (!course || !user) notFound()

  const courseTimeTotal = calcTimeCourse(course.courseChapters)
  const lessonLearnedTimeTotal = calcTimeLearned(course, user.courseLearned)

  return (
    <div>
      <Header
        title={course.title}
        user={user}
        progressPercent={Math.floor(
          (lessonLearnedTimeTotal / courseTimeTotal) * 100
        )}
      />
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
    </div>
  )
}

export default LearningLayout
