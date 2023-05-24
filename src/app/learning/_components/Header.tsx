import SmallLogo from "@/components/common/Logo/SmallLogo"
import { TUser } from "@/types"
import { IconArrowBack } from "@tabler/icons-react"
import Link from "next/link"
import HeaderAction from "./HeaderAction"

type Props = {
  title: string
  user: TUser
}

const Header = ({ title, user }: Props) => {
  return (
    <header className="sticky top-0 z-[999] h-[60px] border-b border-slate-100/10 bg-slate-900 px-7 shadow-md">
      <div className="mx-auto flex h-full items-center">
        <Link href="/" className="mr-10">
          <IconArrowBack className="h-5 w-5" />
        </Link>
        <div className="flex flex-[.8] items-center gap-4 text-2xl font-bold text-slate-200">
          <Link href="/">
            <SmallLogo />
          </Link>
          <h1 className="truncate text-base font-bold capitalize tracking-widest">
            {title}
          </h1>
        </div>
        {/* <div className="flex-1">
          <Searchbar />
        </div> */}
        <HeaderAction user={user} />
      </div>
    </header>
  )
}

export default Header