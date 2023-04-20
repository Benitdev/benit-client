import SmallLogo from "@/components/common/Logo/SmallLogo"
import { IconMenu2 } from "@tabler/icons-react"
import SearchBar from "./SearchBar"
import ProfileSection from "./ProfileSection"

type Props = {}

const Header = (props: Props) => {
  return (
    <header className="stick top-0 z-[999] flex h-[90px] items-center gap-4 pr-4">
      <div className="flex w-[260px] shrink-0 items-center justify-between pl-5">
        <SmallLogo />
        <button className="rounded-xl bg-pink-700/50 p-1">
          <IconMenu2 className="text-pink-700" />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-between p-5">
        <SearchBar />
        <div>
          <ProfileSection />
        </div>
      </div>
    </header>
  )
}

export default Header
