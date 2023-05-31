"use client"

import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"

import { motion } from "framer-motion"
import { MENU_ITEMS } from "@/constants/menu"
import { cn } from "@/utils/cn"

const Sidebar = () => {
  const segments = useSelectedLayoutSegments() ?? ""

  return (
    <div className="sticky top-[60px] h-[calc(100vh-60px)] w-[250px] shrink-0 py-3 text-slate-200">
      <ul className="flex flex-col gap-1">
        {MENU_ITEMS.map((item) => (
          <li key={item.url} className="relative flex">
            {(segments[0] === item.url.slice(1) ||
              (!segments[0] && item.url === "/")) && (
              <motion.span
                layoutId="item-activated"
                className="absolute -left-1 bottom-0 top-0 w-2 rounded-full bg-pink-700"
              />
            )}
            <Link
              href={item.url}
              className={cn(
                "ml-2 flex w-full gap-2 rounded-xl px-3 py-2 hover:bg-slate-200/20",
                {
                  "font-bold text-pink-600":
                    segments[0] === item.url.slice(1) ||
                    (!segments[0] && item.url === "/"),
                }
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
