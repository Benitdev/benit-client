// assets
import { IconLayoutDashboard } from "@tabler/icons-react"

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  title: "Tổng Quan",
  type: "group",
  children: [
    {
      id: "default",
      title: "Tổng quan",
      type: "item",
      url: "/admin",
      icon: IconLayoutDashboard,
      breadcrumbs: false,
    },
  ],
}

export default dashboard
