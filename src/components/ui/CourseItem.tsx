import Image from "next/image"
import Link from "next/link"

import Button from "../common/Button"
import { TCourse } from "@/types"
import { cn } from "@/utils/cn"

type Props = {
  course: TCourse
  isLearning: boolean
  lessonID?: string
}

const CourseItem = async ({ course, isLearning, lessonID }: Props) => {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-xl bg-slate-900/50">
      <div>
        <div className="relative h-[150px] overflow-hidden rounded-xl lg:h-[200px] xl:h-[250px]">
          {course.image ? (
            <Image src={course.image} alt="" fill className="object-cover" />
          ) : (
            <Image src={"/images/7.png"} alt="" fill className="object-cover" />
          )}
        </div>
        <div className="p-4">
          <h2 className="text-large font-bold text-slate-200">
            {course.title}
          </h2>
        </div>
      </div>
      <Link
        href={
          isLearning
            ? `/learning/${course.slug}?id=${lessonID}`
            : `/courses/${course.slug}`
        }
        className="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <div className="translate-y-full transition-transform duration-300 group-hover:translate-y-0">
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
            {isLearning ? "Tiếp tục học" : "Xem khoá học"}
          </Button>
        </div>
      </Link>
    </div>
  )
}

export default CourseItem
