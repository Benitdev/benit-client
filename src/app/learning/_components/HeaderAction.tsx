import CircleProgress from "@/components/common/Progress/CircleProgress"
import AvatarTippy from "@/components/common/Tippy/AvatarTippy"
import Avatar from "@/components/ui/Avatar"
import { TUser } from "@/types"

type Props = {
  user: TUser
  progressPercent: number
}

const HeaderAction = ({ user, progressPercent }: Props) => {
  return (
    <div className="flex flex-1 items-center justify-end gap-4 text-sm">
      <div>
        <CircleProgress percent={progressPercent} />
      </div>
      <button> Ghi chú</button>
      <button> Hướng dẫn</button>
      <AvatarTippy user={user}>
        <Avatar avatar={user.avatar} />
      </AvatarTippy>
    </div>
  )
}

export default HeaderAction
