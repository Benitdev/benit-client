"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import {
  HomeIcon,
  LightBulbIcon,
  FilmIcon,
  DocumentTextIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import clsx from "clsx"

type Props = {}

const items = [
  {
    url: "/",
    title: "Trang chủ",
    icon: HomeIcon,
  },
  {
    url: "/a",
    title: "Lộ trình",
    icon: FilmIcon,
  },
  {
    url: "/b",
    title: "Học",
    icon: LightBulbIcon,
  },
  {
    url: "/blogs",
    title: "Blog",
    icon: DocumentTextIcon,
  },
  {
    url: "/d",
    title: "Template",
    icon: CodeBracketIcon,
  },
]

const Sidebar = (props: Props) => {
  const segment = useSelectedLayoutSegment() ?? ""

  return (
    <div className="sticky top-[60px] h-[calc(100vh-60px)] w-[250px] shrink-0 py-3 text-slate-200">
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.url} className="relative flex">
            {segment === item.url.slice(1) && (
              <motion.span
                layoutId="item-activated"
                className="absolute -left-1 bottom-0 top-0 w-2 rounded-full bg-pink-700"
              ></motion.span>
            )}
            <Link
              href={item.url}
              className={clsx(
                "ml-2 flex w-full gap-2 rounded-xl px-3 py-2 hover:bg-slate-200/20",
                { "font-bold text-pink-600": segment === item.url.slice(1) }
              )}
            >
              <item.icon className="h-6 w-6" />
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
