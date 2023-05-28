import Link from "next/link"

import ButtonAction from "../common/Button/ButtonAuth"
import SmallLogo from "../common/Logo/SmallLogo"
import Avatar from "./Avatar"
import SearchBar from "./Searchbar"
import { TUser } from "@/types"

type Props = {
  user: TUser
}

const Header = ({ user }: Props) => {
  return (
    <header className="sticky top-0 z-[999] h-[60px] border-b border-slate-100/10 bg-slate-900 px-7">
      <div className="mx-auto flex h-full items-center">
        <div className="flex-[.8] text-2xl font-bold text-slate-200">
          <Link href="/">
            <SmallLogo />
          </Link>
        </div>
        <div className="flex-1">
          <SearchBar />
        </div>
        <div className="flex flex-1 justify-end">
          {user ? (
            <Avatar avatar={user.avatar} />
          ) : (
            <Link href={"/login"}>
              <ButtonAction className="bg-cyan-600">Đăng nhập</ButtonAction>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
