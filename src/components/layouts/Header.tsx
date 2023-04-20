import Link from "next/link"
import ButtonAction from "../common/Button/ButtonAuth"
import SmallLogo from "../common/Logo/SmallLogo"
import Avatar from "./Avatar"
import Searchbar from "./Searchbar"

type Props = {
  user: any
}

const Header = ({ user }: Props) => {
  return (
    <header className="sticky top-0 z-[999] h-[60px] border-b border-slate-100/10 bg-slate-900 px-7">
      <div className="mx-auto flex h-full items-center">
        <div className="text-2xl flex-[.8] font-bold text-slate-200">
          <SmallLogo />
        </div>
        <div className="flex-1">
          <Searchbar />
        </div>
        <div className="flex flex-1 justify-end">
          {user ? (
            <Avatar user={user} />
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
