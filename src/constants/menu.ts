import {
  IconBook,
  IconBrandCodesandbox,
  IconHomeStar,
  IconNews,
  IconRoad,
} from "@tabler/icons-react"

export const MENU_ITEMS = [
  {
    url: "/",
    title: "Trang chủ",
    icon: IconHomeStar,
  },
  {
    url: "/road-map",
    title: "Lộ trình",
    icon: IconRoad,
  },
  {
    url: "/courses",
    title: "Học",
    icon: IconBook,
  },
  {
    url: "/blogs",
    title: "Bài viết",
    icon: IconNews,
  },
  {
    url: "/code-template",
    title: "Template",
    icon: IconBrandCodesandbox,
  },
]

export const MENU_ACCOUNT = [
  {
    label: "Trang cá nhân",
    href: "/",
  },
  {
    label: "Viết Blog",
    href: "/new-blog",
  },

  {
    label: "Khoá học của tôi",
    href: "/my-courses",
  },
  {
    label: "Bài viết của tôi",
    href: "/my-blogs",
  },
  {
    label: "UI của tôi",
    href: "/my-code",
  },
  {
    label: "Yêu thích",
    href: "/my-favorite",
  },
  {
    label: "Đã lưu",
    href: "/saved",
  },
]
