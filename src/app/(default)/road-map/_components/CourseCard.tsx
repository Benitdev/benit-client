import Button from "@/components/common/Button"
import { TCourse, TUser } from "@/types"
import { cn } from "@/utils/cn"
import Image from "next/image"
import Link from "next/link"

type Props = {
  course: TCourse
  user: TUser
  progress?: number
}

export default function CourseCard({ course, user, progress }: Props) {
  let isLearning = true
  const courseLearned = user?.courseLearned.find(
    (courseLearned) => courseLearned.course === course._id
  )
  if (!courseLearned) isLearning = false
  const lessonId = courseLearned?.lessons.at(-1)?.lessonId
  return (
    <div className="max-w-[1000px] overflow-hidden rounded-xl bg-slate-800/70 p-6">
      <div className="flex gap-4">
        <div className="relative h-[150px] w-[300px] shrink-0 overflow-hidden rounded-xl lg:h-[200px] xl:h-[250px]">
          {course.image ? (
            <Image src={course.image} alt="" fill className="object-cover" />
          ) : (
            <Image src={"/images/7.png"} alt="" fill className="object-cover" />
          )}
        </div>
        <div className="flex flex-col gap-2 p-4 pt-0">
          <h2 className="bg-gradient-secondary bg-clip-text text-large font-bold text-transparent">
            {course.title}
          </h2>
          <p className="line-clamp-4">{course.description}</p>
          <Link
            href={
              isLearning
                ? `/learning/${course.slug}?id=${lessonId}`
                : `/courses/${course.slug}`
            }
            className="mt-auto"
          >
            <Button
              classStroke={cn(
                isLearning ? "stroke-pink-500" : "stroke-slate-100"
              )}
              className={cn(
                "bg-slate-300 text-slate-900",
                isLearning && "bg-pink-700"
              )}
              small
            >
              {isLearning
                ? progress === 100
                  ? "Xem lại"
                  : "Tiếp tục học"
                : "Xem khoá học"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
