import courseApi from "@/api/server-side/courseApi"
import CourseItem from "./CourseItem"
import authApi from "@/api/server-side/authApi"

type Props = {}

const CourseList = async (props: Props) => {
  const coursesRes = courseApi.getCourses()
  const userRes = authApi.getUser()
  const [courses, user] = await Promise.all([coursesRes, userRes])
  return (
    <div className="mt-8 grid grid-cols-list gap-8">
      {courses?.map((course) => {
        let isLearning = true
        const courseLearned = user?.courseLearned.find(
          (courseLearned) => courseLearned.course === course._id
        )
        if (!courseLearned) isLearning = false
        const lessonID = courseLearned?.lessons.at(-1)

        return (
          // @ts-expect-error Async Server Component
          <CourseItem
            key={course._id}
            course={course}
            isLearning={isLearning}
            lessonID={lessonID?.lessonID}
          />
        )
      })}
    </div>
  )
}

export default CourseList
