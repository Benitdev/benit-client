import SmallLogo from "@/components/common/Logo/SmallLogo"
import { IconMenu2 } from "@tabler/icons-react"
import SearchBar from "./SearchBar"
import ProfileSection from "./ProfileSection"
import Link from "next/link"

type Props = {
  user: any
}

const Header = ({ user }: Props) => {
  return (
    <header className="sticky top-0 z-[999] flex h-[90px] items-center gap-4 bg-slate-900 pr-4">
      <div className="flex w-[260px] shrink-0 items-center justify-between pl-5">
        <Link href="/">
          <SmallLogo />
        </Link>
        <button className="group rounded-xl bg-pink-700/10 p-1 hover:bg-pink-700">
          <IconMenu2 className="text-pink-800 group-hover:text-slate-200" />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-between p-5">
        <SearchBar />
        <div>
          <ProfileSection user={user} />
        </div>
      </div>
    </header>
  )
}

export default Header
