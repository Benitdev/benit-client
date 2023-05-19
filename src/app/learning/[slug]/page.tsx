import courseApi from "@/api/client-side/courseApi"
import authApi from "@/api/server-side/authApi"

type Props = {
  params: { slug: string }
  searchParams: {
    slug?: string
  }
}

const LearningPage = async ({ params: { slug }, searchParams }: Props) => {
  const course = await courseApi.getCourseDetail(slug)
  const user = await authApi.getUser().catch(() => null)
  const lesson = user?.courseLearned
    .find((course) => course.courseSlug === slug)
    ?.chapters.find((chapter) =>
      chapter.lessons.includes(searchParams?.slug ?? "")
    )
  console.log(lesson)
  return <div>{/* <YouTubePlayer /> */}</div>
}

export default LearningPage
