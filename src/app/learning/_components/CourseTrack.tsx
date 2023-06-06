import CourseAccording from "@/components/common/According/CourseAccording"
import { TCourseChapter, TLesson } from "@/types"

type Props = {
  chapters: TCourseChapter[]
  lessonsLearned?: { lessonId: string; status: "done" | "learning" }[]
}

const CourseTrack = ({ chapters, lessonsLearned }: Props) => {
  return (
    <aside className="sticky top-[60px] h-[calc(100vh-60px)] min-w-[250px] flex-[0.3] shrink-0 border-l border-slate-200/10 py-2">
      <div className="flex flex-col">
        <h2 className="px-3 py-2 font-bold">Nội dung khóa học</h2>
        <div className="px-2">
          <CourseAccording
            chapters={chapters}
            type="tracker"
            lessonsLearned={lessonsLearned}
          />
        </div>
      </div>
    </aside>
  )
}

export default CourseTrack
