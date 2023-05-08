"use client"

import { IconBell, IconMessageChatbot } from "@tabler/icons-react"

import Avatar from "@/components/ui/Avatar"

type Props = {
  user: any
}

const ProfileSection = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-full bg-slate-200/20 p-2">
        <IconMessageChatbot />
      </div>
      <div className="rounded-full bg-slate-200/20 p-2">
        <IconBell />
      </div>
      <Avatar user={user} />
    </div>
  )
}

export default ProfileSection
