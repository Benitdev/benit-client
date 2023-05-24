import { TCourseChapter } from "@/types"

export const calcTimeCourse = (chapters: TCourseChapter[]) =>
  chapters
    .map((chapter) =>
      chapter.lessons.reduce(
        (chapterTimeTotal, lesson) =>
          chapterTimeTotal + Number(lesson.duration),
        0
      )
    )
    .reduce(
      (timeCourseTotal, timeChapterTotal) => timeCourseTotal + timeChapterTotal,
      0
    )
