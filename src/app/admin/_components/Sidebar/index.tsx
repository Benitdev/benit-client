import React from "react"
import MenuList from "./MenuList"

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className="sticky top-0 flex h-[calc(100vh-90px)] w-[260px] flex-col p-5 pt-0">
      <MenuList />
      {/* <div className="absolute left-11 top-[15%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/70 bg-gradient-to-tr blur-[200px]"></div> */}
      <button className="mt-auto block text-[14px] font-bold">Logout</button>
    </div>
  )
}

export default Sidebar
