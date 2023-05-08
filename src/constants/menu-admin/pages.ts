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
  title: "Quản lí",
  type: "group",
  children: [
    {
      id: "1",
      title: "Tài khoản",
      type: "item",
      url: "/admin/account",
      icon: IconUserCircle,
      breadcrumbs: false,
    },
    {
      id: "2",
      title: "Danh mục khoá học",
      type: "item",
      url: "/admin/course-category",
      icon: IconCategory2,
      breadcrumbs: false,
    },
    {
      id: "3",
      title: "Khoá học",
      type: "item",
      url: "/admin/course",
      icon: IconNotebook,
      breadcrumbs: false,
    },
    {
      id: "4",
      title: "Danh mục bài viết",
      type: "item",
      url: "/admin/blog-category",
      icon: IconCategory2,
      breadcrumbs: false,
    },
    {
      id: "4",
      title: "Bài viết",
      type: "item",
      url: "/admin/blog",
      icon: IconArticle,
      breadcrumbs: false,
    },

    {
      id: "7",
      title: "Danh mục Template",
      type: "item",
      url: "/admin/code-category",
      icon: IconCategory2,
      breadcrumbs: false,
    },
    {
      id: "6",
      title: "Template",
      type: "item",
      url: "/admin/code",
      icon: IconCode,
      breadcrumbs: false,
    },
  ],
}

export default pages
