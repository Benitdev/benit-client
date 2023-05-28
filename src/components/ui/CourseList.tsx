import courseApi from "@/api/server-side/courseApi"
import Heading from "../common/Heading"
import CourseItem from "./CourseItem"
import authApi from "@/api/server-side/authApi"

type Props = {}

const CourseList = async (props: Props) => {
  const coursesRes = courseApi.getCourses()
  const userRes = authApi.getUser()
  const [courses, user] = await Promise.all([coursesRes, userRes])
  return (
    <section className="relative p-10 shadow-inner">
      <div className="min-h-[500px]">
        <Heading flag="Free">Khoá Học Miễn Phí</Heading>
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
      </div>
      <div className="absolute left-11 top-[15%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/70 bg-gradient-to-tr blur-[200px]"></div>
      <div className="absolute bottom-[15%] right-11 -z-10 h-24 w-[40rem] rotate-45 bg-purple-600/60 bg-gradient-to-tr blur-[120px]"></div>
      <div className="absolute right-0 top-0 -z-10 h-[30rem] w-[30rem] -translate-y-1/2 translate-x-1/2 rotate-45 bg-orange-700/30 bg-gradient-to-tr blur-[100px]"></div>
      <div className="bg-grid absolute inset-0 -z-10"></div>
    </section>
  )
}

export default CourseList
