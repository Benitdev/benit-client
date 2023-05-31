export type TCodeTemplate = {
  _id: string
  title: string
  description: string
  categoryID: string
  htmlCode: string
  cssCode: string
  jsCode: string
  favorites: number
  authorId: {
    avatar: string
    fullName: string
  }
  status: string
  createdAt: string
  updatedAt: string
}
