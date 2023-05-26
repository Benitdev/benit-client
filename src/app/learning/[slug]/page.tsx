import { notFound } from "next/navigation"

import authApi from "@/api/server-side/authApi"
import courseApi from "@/api/server-side/courseApi"
import Video from "../_components/Video"
import Button from "@/components/common/Button"
import Heading from "@/components/common/Heading"
import { TLesson } from "@/types"
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
} from "@tabler/icons-react"
import Link from "next/link"

type Props = {
  params: { slug: string }
  searchParams: {
    id?: string
  }
}

const LearningPage = async ({ params: { slug }, searchParams }: Props) => {
  const lessonRes = courseApi.getLesson(searchParams.id as string)
  const courseRes = courseApi.getCourseDetail(slug)
  const userRes = authApi.getUser()

  const [user, lesson, course] = await Promise.all([
    userRes,
    lessonRes,
    courseRes,
  ])

  if (!lesson) notFound()

  const courseLearned = user?.courseLearned.find(
    (courseLearn) => courseLearn.course === course._id
  )

  const prevLesson = courseLearned?.lessons.find(
    (lesson, index) =>
      courseLearned.lessons[index + 1]?.lessonID === searchParams.id
  )

  const isLessonExist = user?.courseLearned
    .find((courseLearn) => courseLearn.course === course._id)
    ?.lessons.find((lesson) => lesson.lessonID === searchParams.id)
  if (!isLessonExist) notFound()

  let nextLesson: TLesson | undefined
  for (let index = 0; index < course.courseChapters.length; index++) {
    const lessonIndex = course?.courseChapters[index].lessons.findIndex(
      (lesson) => lesson._id === searchParams.id
    ) as number

    nextLesson =
      course?.courseChapters[index].lessons[lessonIndex + 1] ??
      course?.courseChapters[index + 1]?.lessons[0]
    if (lessonIndex !== -1) break
  }

  const isLearnedNextLesson = user?.courseLearned.find((courseLearn) =>
    courseLearn.lessons.some((lesson) => lesson.lessonID === nextLesson?._id)
  )

  return (
    <div>
      <div>
        <Video
          videoID={lesson.videoID}
          nextLessonID={nextLesson?._id}
          isLearnedNextLesson={!!isLearnedNextLesson}
          courseID={course._id}
        />
        <div className="space-y-10 p-10 px-14">
          <div className="flex justify-between gap-4">
            <div>
              <Heading>{lesson.title}</Heading>
              <span>{lesson.createdAt}</span>
            </div>
            <button> Thêm ghi chú tại </button>
          </div>
          <div>
            <h2>
              Tham gia các cộng đồng để cùng học hỏi, chia sẻ và tham thinh xem
              Benit sắp có gì mới nhé!
            </h2>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 z-[99] w-full bg-black/80 py-2 backdrop-blur-sm">
        <div className="mx-auto flex w-fit gap-8">
          <Link href={`/learning/${slug}?id=${prevLesson?.lessonID}`}>
            <button className="group flex items-center gap-4 p-2 px-6">
              <IconArrowBigLeftFilled className="h-6 w-6 transition-all group-hover:-translate-x-5" />
              <span className="font-bold group-hover:text-pink-500">
                Bài trước
              </span>
            </button>
          </Link>
          <Link href={`/learning/${slug}?id=${nextLesson?._id}`}>
            <button className="group flex items-center gap-4 rounded-lg border border-pink-700 p-2 px-6 text-pink-500">
              <span className="font-bold group-hover:text-pink-500">
                Bài tiếp thep
              </span>
              <IconArrowBigRightFilled className="h-6 w-6 transition-all group-hover:translate-x-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LearningPage
