import Avatar from "@/components/ui/Avatar"
import { TUser } from "@/types"

type Props = {
  user: TUser
}

const HeaderAction = ({ user }: Props) => {
  return (
    <div className="flex flex-1 items-center justify-end gap-4 text-sm">
      <div></div>
      <button> Ghi chú</button>
      <button> Hướng dẫn</button>
      <Avatar avatar={user.avatar} />
    </div>
  )
}

export default HeaderAction
