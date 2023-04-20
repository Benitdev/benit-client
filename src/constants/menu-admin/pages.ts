// assets
import { IconKey, IconDashboard, IconUserCircle } from "@tabler/icons-react"

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  title: "Pages",
  caption: "Pages Caption",
  type: "group",
  children: [
    {
      id: "1",
      title: "Account",
      type: "item",
      url: "/admin/account",
      icon: IconUserCircle,
      breadcrumbs: false,
    },
    {
      id: "2",
      title: "Course Category",
      type: "item",
      url: "/admin/course-category",
      icon: IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "3",
      title: "Course",
      type: "item",
      url: "/admin/course",
      icon: IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "4",
      title: "Blog Category",
      type: "item",
      url: "/admin/blog-category",
      icon: IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "4",
      title: "Blog",
      type: "item",
      url: "/admin/blog",
      icon: IconDashboard,
      breadcrumbs: false,
    },
  ],
}

export default pages
