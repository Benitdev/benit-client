export type TPost = {
  _id: string
  title: string
  slug: string
  description: string
  content: string
  image: string
  tags: { _id: string; title: string }[]
  readingTime: number
  authorId: {
    _id: string
    fullName: string
    avatar: string
  }
  status: string
  likes: any[]
  totalComment: number
  views: number
  createdAt: string
  updatedAt: string
}

export type TFilter = {
  feature?: string
  categoryId?: string
  title?: string
  status?: string
  role?: string
}
