export type TPost = {
  _id: string
  title: string
  slug: string
  content: string
  image: string
  tags: string[]
  readingTime: number
  authorId: {
    _id: string
    fullName: string
    avatar: string
  }
  likes: any[]
  comments: any[]
  views: number
  createAt: string
  updateAt: string
}
