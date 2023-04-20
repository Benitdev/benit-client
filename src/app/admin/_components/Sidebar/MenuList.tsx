import menuItems from "@/constants/menu-admin"
import { Typography } from "@mui/material"

import NavGroup from "./NavGroup"

type Props = {}

const MenuList = (props: Props) => {
  const navItems = menuItems.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />
      default:
        return <span>Menu Items Error</span>
    }
  })
  return <div>{navItems}</div>
}

export default MenuList
