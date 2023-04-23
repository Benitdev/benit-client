// assets
import { IconLayoutDashboard } from "@tabler/icons-react"

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/admin",
      icon: IconLayoutDashboard,
      breadcrumbs: false,
    },
  ],
}

export default dashboard
