"use client"

import { TCourseChapter } from "@/types"
import According from "./According"
import { IconPlus, IconVideo } from "@tabler/icons-react"
import { useState } from "react"
import { IconMinus } from "@tabler/icons-react"

type Props = {
  chapters: TCourseChapter[]
  type?: "tracker"
}

const CourseAccording = ({ chapters, type }: Props) => {
  const [expand, setExpand] = useState<string[]>([])
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
            <div key={lesson._id} className="flex items-center gap-2 p-4 px-7">
              <IconVideo className="h-4 w-4 text-red-500" />

              <p className="text-sm">
                {index + 1}. {lesson.title}
              </p>

              <span className="ml-auto text-pink-600">
                {lesson.duration
                  .replace("PT", "")
                  .replace("H", ":")
                  .replace("M", ":")
                  .replace("S", "")}
              </span>
            </div>
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
}) => (
  <div className="flex items-center gap-2">
    {isOpen ? (
      <IconMinus className="h-5 w-5 text-red-500" />
    ) : (
      <IconPlus className="h-5 w-5 text-red-500" />
    )}
    <div className="text-left">
      <span>{`${chapter.index}. ${chapter.title}`}</span>
      {type === "tracker" && (
        <p className="text-xs text-slate-300">6/10 | 1:06:20</p>
      )}
    </div>
    <small className="ml-auto">{chapter.lessons.length} bài học</small>
  </div>
)

export default CourseAccording
