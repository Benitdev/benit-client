"use client"

import { motion } from "framer-motion"

type Props = {
  children: React.ReactNode
}

export default function HeadingCloseTag({ children }: Props) {
  return (
    <h1 className="relative bg-gradient-to-b from-pink-700 to-red-400 bg-clip-text pb-2 text-heading font-bold text-transparent">
      {children}
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: "50%" }}
        transition={{
          duration: 0.7,
          type: "spring",
        }}
        className="absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-pink-700 to-red-400"
      ></motion.span>
    </h1>
  )
}
