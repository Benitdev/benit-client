import courseApi from "@/api/server-side/courseApi"
import CourseItem from "./CourseItem"
import authApi from "@/api/server-side/authApi"
import { calcTimeCourse, calcTimeLearned } from "@/utils/calcTimeCourse"

type Props = {
  progress?: "done"
}

const CourseList = async ({ progress }: Props) => {
  const coursesRes = courseApi.getCourses()
  const userRes = authApi.getUser()
  const [courses, user] = await Promise.all([coursesRes, userRes])

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {courses?.map((course) => {
        if (progress === "done") {
          const courseTimeTotal = calcTimeCourse(course.courseChapters)
          const lessonLearnedTimeTotal = calcTimeLearned(
            course,
            user.courseLearned
          )

          if (lessonLearnedTimeTotal / courseTimeTotal === 1)
            return (
              // @ts-expect-error Async Server Component
              <CourseItem
                key={course._id}
                course={course}
                user={user}
                progress={(lessonLearnedTimeTotal / courseTimeTotal) * 100}
              />
            )
        } else if (progress === "learning") {
          const courseTimeTotal = calcTimeCourse(course.courseChapters)
          const lessonLearnedTimeTotal = calcTimeLearned(
            course,
            user.courseLearned
          )

          if (
            lessonLearnedTimeTotal / courseTimeTotal < 1 &&
            lessonLearnedTimeTotal !== 0
          )
            return (
              // @ts-expect-error Async Server Component
              <CourseItem
                key={course._id}
                course={course}
                user={user}
                progress={(lessonLearnedTimeTotal / courseTimeTotal) * 100}
              />
            )
        } else
          return (
            // @ts-expect-error Async Server Component
            <CourseItem key={course._id} course={course} user={user} />
          )
      })}
    </div>
  )
}

export default CourseList
