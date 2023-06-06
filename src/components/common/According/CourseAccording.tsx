"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import {
  IconAlarm,
  IconPlus,
  IconVideo,
  IconMinus,
  IconLock,
  IconDiscountCheckFilled,
} from "@tabler/icons-react"

import According from "./According"
import { TCourseChapter, TLesson } from "@/types"
import { cn } from "@/utils/cn"
import { durationToSecond, secondToString } from "@/utils/durationify"

type Props = {
  chapters: TCourseChapter[]
  type?: "tracker"
  lessonsLearned?: { lessonId: string; status: "done" | "learning" }[]
}

const CourseAccording = ({ chapters, type, lessonsLearned }: Props) => {
  const searchParams = useSearchParams()
  const lessonId = searchParams.get("id")
  const pathname = usePathname()

  const [expand, setExpand] = useState<string[]>(
    type === "tracker"
      ? chapters.map((chapter) => {
          let isExpand = false
          for (let i = 0; i < (lessonsLearned?.length ?? 0); i++) {
            if (
              chapter.lessons.findIndex(
                (lesson) => lesson._id === lessonsLearned?.[i].lessonId
              ) !== -1
            ) {
              isExpand = true
              break
            }
          }
          return isExpand ? chapter._id : ""
        })
      : [chapters[0]?._id]
  )

  return (
    <div className="mt-2 space-y-4">
      {chapters.map((chapter) => (
        <According
          key={chapter._id}
          item={{ chapter, lessonsLearned }}
          Heading={AccordingHeading}
          expand={expand.includes(chapter._id)}
          type={type}
        >
          {chapter.lessons.map((lesson, index) => (
            <Link
              key={lesson._id}
              href={`${pathname}?id=${lesson._id}`}
              className={cn(
                "relative flex cursor-pointer items-center gap-2 rounded-xl p-4 px-7",
                lessonId === lesson._id && "bg-pink-700/30",
                type === "tracker"
                  ? lessonsLearned?.some(
                      (lessonLearned) => lessonLearned.lessonId === lesson._id
                    )
                    ? "px-10 hover:bg-pink-700/30"
                    : "pointer-events-none bg-black/20 px-10 opacity-70"
                  : "pointer-events-none"
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
              {type === "tracker" &&
                !lessonsLearned?.some(
                  (lessonLearned) => lessonLearned.lessonId === lesson._id
                ) && (
                  <IconLock className="absolute right-3 ml-2 h-5 w-5 text-slate-400" />
                )}
              {lessonsLearned?.find(
                (lessonLearned) => lessonLearned.lessonId === lesson._id
              )?.status === "done" && (
                <IconDiscountCheckFilled className="absolute right-3 ml-2 h-5 w-5 text-green-400" />
              )}
            </Link>
          ))}
        </According>
      ))}
    </div>
  )
}

const AccordingHeading = ({
  chapter,
  lessonsLearned,
  isOpen,
  type,
}: {
  chapter: TCourseChapter
  lessonsLearned: { lessonId: string; status: "done" | "learning" }[]
  isOpen: boolean
  type?: "tracker"
}) => {
  const durationTotal = chapter.lessons.reduce(
    (total, lesson) => total + Number(lesson.duration),
    0
  )

  let totalLessonLearned = 0

  chapter.lessons.forEach((lesson) => {
    if (
      lessonsLearned.find(
        (lessonLearned) =>
          lessonLearned.lessonId === lesson._id &&
          lessonLearned.status === "done"
      )
    ) {
      totalLessonLearned = totalLessonLearned + 1
    }
  })

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
            <span>
              {totalLessonLearned}/{chapter.lessons.length}
            </span>
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
