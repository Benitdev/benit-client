// assets
import {
  IconKey,
  IconNotebook,
  IconUserCircle,
  IconCategory2,
  IconArticle,
  IconCode,
} from "@tabler/icons-react"

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
      icon: IconCategory2,
      breadcrumbs: false,
    },
    {
      id: "3",
      title: "Course",
      type: "item",
      url: "/admin/course",
      icon: IconNotebook,
      breadcrumbs: false,
    },
    {
      id: "4",
      title: "Blog Category",
      type: "item",
      url: "/admin/blog-category",
      icon: IconCategory2,
      breadcrumbs: false,
    },
    {
      id: "4",
      title: "Blog",
      type: "item",
      url: "/admin/blog",
      icon: IconArticle,
      breadcrumbs: false,
    },

    {
      id: "7",
      title: "Code Category",
      type: "item",
      url: "/admin/code-category",
      icon: IconCategory2,
      breadcrumbs: false,
    },
    {
      id: "6",
      title: "Code Template",
      type: "item",
      url: "/admin/code",
      icon: IconCode,
      breadcrumbs: false,
    },
  ],
}

export default pages
