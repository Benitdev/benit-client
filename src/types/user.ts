export type TUser = {
  _id: string
  username: string
  password?: string
  email: string
  phoneNumber: number
  fullName: string
  avatar: string
  provider: string
  role: string
  status: string
  courseLearned: {
    courseSlug: string
    chapters: {
      chapterID: string
      lessons: string[]
    }[]
  }[]
}
