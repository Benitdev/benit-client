export type TCourse = {
  _id: string
  title: string
  slug: string
  description: string
  goals: string[]
  image: string
  tags: string[]
  type: string
  level: string
  feature: string
  like: any
  courseChapters: TCourseChapter[]
  status: string
}

export type TCourseChapter = {
  _id: string
  index: number
  title: string
  lessons: Lesson[]
  description: string
  createdAt: string
  updatedAt: string
}

export type Lesson = {
  duration: string
  title: string
  videoID: string
  _id: string
}
