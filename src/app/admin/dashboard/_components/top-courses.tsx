import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/avatar"
import { TCourse, TUser } from "@/types"
import { Modal } from "@mui/material"
import { IconUser } from "@tabler/icons-react"
import { useState } from "react"

type Props = {
  topCourses?: {
    registeredUsers: TUser[]
    course: TCourse
  }[]
}
export function TopCourses({ topCourses }: Props) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const topCoursesSorted = topCourses?.sort(
    (a, b) => b.registeredUsers.length - a.registeredUsers.length
  )

  const [usersRegistered, setUsersRegistered] = useState<TUser[]>([])

  const handleClose = () => setIsOpenModal((prev) => !prev)

  return (
    <div className="space-y-4">
      {topCoursesSorted?.map((courses) => (
        <div
          key={courses.course._id}
          className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-slate-900/50"
          onClick={() => {
            setUsersRegistered(courses.registeredUsers)
            handleClose()
          }}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={courses.course.image} alt="Avatar" />
            <AvatarFallback>{courses.course.title.slice(2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {courses.course.title}
            </p>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {courses.course.description}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1 font-medium">
            +{courses.registeredUsers.length} <IconUser className="h-4 w-4" />
          </div>
        </div>
      ))}
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="scrollbar-style absolute left-1/2 top-1/2 max-h-[80vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-slate-900/70 backdrop-blur-md">
          <div className="sticky top-0 z-10 bg-slate-900 py-2 text-center font-bold uppercase tracking-wider text-pink-600 drop-shadow-xl">
            Thông tin người đăng kí khoá học
          </div>
          <div>
            {usersRegistered?.map((user) => (
              <div
                key={user._id}
                className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-slate-900/50"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} alt="Avatar" />
                  <AvatarFallback>{user.fullName.slice(1)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.fullName}
                  </p>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1 font-medium">
                  <IconUser className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}
