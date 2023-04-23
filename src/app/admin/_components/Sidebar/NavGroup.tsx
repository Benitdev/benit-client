import { useSelectedLayoutSegment } from "next/navigation"

import NavCollapse from "./NavCollapse"
import NavItem from "./NavItem"
import menuItems from "@/constants/menu-admin"

type Props = {
  item: any
}

const NavGroup = ({ item }: Props) => {
  const segment = useSelectedLayoutSegment() ?? ""
  const itemChildren = item.children.map((nav: any) => {
    if (nav.type === "collapse") return <NavCollapse></NavCollapse>
    return <NavItem key={nav.url} item={nav} segment={segment} />
  })
  return (
    <div className="space-y-4 border-b border-slate-100/20 py-4">
      <h1 className="font-bold">{item.title}</h1>
      <div className="space-y-2">{itemChildren}</div>
    </div>
  )
}

export default NavGroup
