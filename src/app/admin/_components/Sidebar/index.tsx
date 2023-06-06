import MenuList from "./MenuList"
import { IconArrowBarLeft } from "@tabler/icons-react"

const Sidebar = () => {
  return (
    <div className="sticky top-0 flex h-[calc(100vh-90px)] w-[260px] flex-col p-5 pt-0">
      <MenuList />
      {/* <div className="absolute left-11 top-[15%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/70 bg-gradient-to-tr blur-[200px]"></div> */}
      <button className="mt-auto flex items-center justify-center gap-2 pr-2 text-[14px] font-bold hover:text-pink-600">
        <IconArrowBarLeft />
        Logout
      </button>
    </div>
  )
}

export default Sidebar
