import Image from "next/image"
import { redirect } from "next/navigation"
import { RedirectType } from "next/dist/client/components/redirect"

import { IconBrandDrops } from "@tabler/icons-react"

import courseApi from "@/api/server-side/courseApi"
import CourseAccording from "@/components/common/According/CourseAccording"
import Button from "@/components/common/Button"
import Heading from "@/components/common/Heading"
import { IconAlarmFilled, IconAngle, IconMovie } from "@tabler/icons-react"
import authApi from "@/api/server-side/authApi"
import { IMAGE_DEFAULT } from "@/constants/imagePath"

export const metadata = {
  title: "Blogs",
}

type Props = {
  params: { slug: string }
}

const CourseDetailPage = async ({ params: { slug } }: Props) => {
  const course = await courseApi.getCourseDetail(slug)
  const user = await authApi.getUser().catch(() => null)
  const lessonTotal = course?.courseChapters
    .map((chapter) => chapter.lessons.length)
    .reduce((prev, lessonLength) => prev + lessonLength, 0)

  const lessonID = course?.courseChapters[0]?.lessons[0]._id
  const courseID = course._id
  const courseSlug = course.slug

  async function registerCourse() {
    "use server"
    if (!user) redirect("/login")
    try {
      await authApi.registerCourse({
        course: courseID,
        lesson: lessonID,
      })
      redirect(`/learning/${courseSlug}?id=${lessonID}`, RedirectType.push)
    } catch (e) {
      throw e
    }
  }

  return (
    <div className="mt-5 flex w-full gap-4 p-2 lg:p-5">
      <div className="flex-[0.6] space-y-4">
        <Heading className="capitalize">{course.title}</Heading>
        <p className="text-slate-400">{course.description}</p>
        <div className="py-4">
          <h3 className="text-large font-bold">Bạn sẽ học được gì?</h3>
          <ul className="mt-4 grid grid-cols-2 gap-4">
            {course.goals?.map((goal) => (
              <li key={goal} className="flex gap-3">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="check"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-6 w-6 shrink-0 text-red-600 "
                >
                  <path
                    fill="currentColor"
                    d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
                  ></path>
                </svg>
                {goal}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-large font-bold">Nội dung khoá học</h3>
          <CourseAccording chapters={course.courseChapters} />
        </div>
      </div>
      <div className="flex flex-[0.4] flex-col items-center gap-4 pt-8">
        <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
          <Image
            src={course.image || IMAGE_DEFAULT}
            fill
            alt=""
            className="object-cover"
            sizes="33vw"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold capitalize text-pink-700">
            khóa học {course.type === "free" ? "miễn phí" : "có phí"}
          </h3>
          <form action={registerCourse}>
            <Button
              classStroke="stroke-pink-700"
              className="mx-auto bg-pink-700"
              small
              type="submit"
            >
              Đăng kí học
            </Button>
          </form>
          <ul className="space-y-3 py-2">
            <li className="flex items-center gap-2">
              <IconAngle className="h-6 w-6" />
              <span>Trình độ {course.level}</span>
            </li>
            <li className="flex items-center gap-2">
              <IconMovie className="h-6 w-6" />
              <p>
                Tổng số <span className="font-bold">{lessonTotal}</span> bài học
              </p>
            </li>
            <li className="flex items-center gap-2">
              <IconAlarmFilled className="h-6 w-6" />
              <span>Học mọi lúc, mọi nơi</span>
            </li>
            <li className="flex items-center gap-2">
              <IconBrandDrops className="h-6 w-6" />
              <span>Học mọi lúc, mọi nơi</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage
