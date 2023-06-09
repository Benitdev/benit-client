import { TCourse } from "./course"
import { TPost } from "./post"
import { TUser } from "./user"

export type ResSuccess = {
  message: string
}

export type Statistical = {
  totalPost: number
  totalUser: number
  totalCode: number
  topCourses: {
    registeredUsers: TUser[]
    course: TCourse
  }[]
  topViewPosts: TPost[]
}

export enum TAction {
  Add,
  Edit,
  Delete,
  View,
}
