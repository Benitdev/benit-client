import React from "react"
import MenuList from "./MenuList"

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className="sticky top-0 h-screen w-[260px] p-5 ">
      <MenuList />
      {/* <div className="absolute left-11 top-[15%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/70 bg-gradient-to-tr blur-[200px]"></div> */}
    </div>
  )
}

export default Sidebar
