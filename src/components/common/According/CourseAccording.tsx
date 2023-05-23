"use client"

import { TCourseChapter } from "@/types"
import According from "./According"
import { IconAlarm, IconPlus, IconVideo } from "@tabler/icons-react"
import { useState } from "react"
import { IconMinus } from "@tabler/icons-react"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/utils/cn"
import Link from "next/link"
import { durationToSecond, secondToString } from "@/utils/durationify"

type Props = {
  chapters: TCourseChapter[]
  type?: "tracker"
  lessonsLearned?: string[]
}

const CourseAccording = ({ chapters, type, lessonsLearned }: Props) => {
  const searchParams = useSearchParams()
  const lessonID = searchParams.get("id")
  const pathname = usePathname()

  const [expand, setExpand] = useState<string[]>([chapters[0]?._id])

  return (
    <div className="mt-2 space-y-4">
      {chapters.map((chapter) => (
        <According
          key={chapter._id}
          item={chapter}
          Heading={AccordingHeading}
          expand={expand.includes(chapter._id)}
          setExpand={setExpand}
          type="tracker"
        >
          {chapter.lessons.map((lesson, index) => (
            <Link
              href={`${pathname}?id=${lesson._id}`}
              key={lesson._id}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl p-4 px-7 ",
                lessonID === lesson._id && "bg-pink-700/30",
                lessonsLearned?.includes(lesson._id)
                  ? "hover:bg-pink-700/30"
                  : "pointer-events-none bg-black/20 opacity-70"
              )}
            >
              <IconVideo className="h-4 w-4 text-red-500" />

              <p className="text-sm">
                {index + 1}. {lesson.title}
              </p>

              <small className="ml-auto flex items-center font-bold text-pink-600">
                {secondToString(Number(lesson.duration)).map((amount, index) =>
                  amount !== 0 ? (
                    <span key={index}>
                      {amount}
                      {index !==
                      secondToString(Number(lesson.duration)).length - 1
                        ? ":"
                        : ""}
                    </span>
                  ) : null
                )}
                <IconAlarm className="ml-2 h-5 w-5" />
              </small>
            </Link>
          ))}
        </According>
      ))}
    </div>
  )
}

const AccordingHeading = ({
  chapter,
  isOpen,
  type,
}: {
  chapter: TCourseChapter
  isOpen: boolean
  type?: "tracker"
}) => {
  const durationTotal = chapter.lessons.reduce(
    (total, lesson) => total + Number(lesson.duration),
    0
  )
  return (
    <div className="flex items-center gap-2">
      {isOpen ? (
        <IconMinus className="h-5 w-5 text-red-500" />
      ) : (
        <IconPlus className="h-5 w-5 text-red-500" />
      )}
      <div className="text-left">
        <span>{`${chapter.index}. ${chapter.title}`}</span>
        {type === "tracker" && (
          <p className="mt-1 flex gap-1 text-xs font-bold text-pink-600 ">
            <span>6/10</span>
            <span>|</span>
            <span className="flex items-center">
              <IconAlarm className="mr-1 h-4 w-4" />
              {secondToString(Number(durationTotal)).map((amount, index) =>
                amount !== 0 ? (
                  <span key={index}>
                    {amount}
                    {index !== secondToString(Number(durationTotal)).length - 1
                      ? ":"
                      : ""}
                  </span>
                ) : null
              )}
            </span>
          </p>
        )}
      </div>
      <small className="ml-auto">{chapter.lessons.length} bài học</small>
    </div>
  )
}

export default CourseAccording
