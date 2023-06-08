import authApi from "@/api/server-side/authApi"
import courseApi from "@/api/server-side/courseApi"
import CourseCard from "./CourseCard"

type Props = {
  progress?: "done"
  categoryId?: string
}

export default async function RoadMapCourseList({
  progress,
  categoryId,
}: Props) {
  const coursesRes = courseApi.getCourses({ categoryId })
  const userRes = authApi.getUser()
  const [courses, user] = await Promise.all([coursesRes, userRes])

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} user={user} />
      ))}
    </div>
  )
}
