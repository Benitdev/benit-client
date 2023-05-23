import { notFound } from "next/navigation"

import authApi from "@/api/server-side/authApi"
import courseApi from "@/api/server-side/courseApi"
import Video from "../_components/Video"
import Button from "@/components/common/Button"
import Heading from "@/components/common/Heading"

type Props = {
  params: { slug: string }
  searchParams: {
    id?: string
  }
}

const LearningPage = async ({ params: { slug }, searchParams }: Props) => {
  const user = await authApi.getUser().catch(() => null)
  const lesson = await courseApi
    .getLesson(searchParams.id as string)
    .catch(() => notFound())
  const course = await courseApi.getCourseDetail(slug)

  const isLessonExist = user?.courseLearned
    .find((courseLearn) => courseLearn.course === course._id)
    ?.lessons.find((lesson) => lesson === searchParams.id)
  if (!isLessonExist) notFound()

  return (
    <div>
      <Video videoID={lesson.videoID} />
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
  )
}

export default LearningPage
