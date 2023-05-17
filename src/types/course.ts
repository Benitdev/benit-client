export type TCourse = {
  _id: string
  title: string
  slug: string
  description: string
  goals: string[]
  image: string
  tags: string[]
  feature: string
  like: any
  courserChapter: TCourseChapter[]
  status: string
}

export type TCourseChapter = {
  title: string
  description: string
  createdAt: string
  updatedAt: string
}
