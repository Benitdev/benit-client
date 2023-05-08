import Link from "next/link"

import clsx from "clsx"
import { motion } from "framer-motion"

type Props = {
  item: any
  segment: string
}

const NavItem = ({ item, segment }: Props) => {
  return (
    <Link
      href={item.url}
      className={clsx(
        "relative flex h-[48px] items-center gap-4 rounded-xl px-4 hover:bg-pink-700/30 hover:font-bold hover:text-pink-600",
        {
          "bg-pink-700/30 font-bold text-pink-600":
            segment === item.url.slice(7),
        }
      )}
    >
      <item.icon />
      <span>{item.title}</span>
      {segment === item.url.slice(7) && (
        <motion.span
          layoutId="item-activated"
          className="absolute -left-6 bottom-0 top-0 w-2 rounded-full bg-pink-700"
        ></motion.span>
      )}
    </Link>
  )
}

export default NavItem
