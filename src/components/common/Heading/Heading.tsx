"use client"

import { motion } from "framer-motion"

import clsx from "clsx"

type Props = {
  flag?: string
  underline?: boolean
  className?: string
  children: string
}

const Heading = ({ flag, className, underline, children }: Props) => {
  return (
    <h1
      className={clsx(
        "relative bg-gradient-to-b from-pink-700 to-red-400 bg-clip-text text-heading font-bold leading-tight text-transparent",
        className
      )}
    >
      {" "}
      {children}
      {underline && (
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "150%" }}
          transition={{
            duration: 0.7,
            type: "spring",
          }}
          className="absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-pink-700 to-red-400"
        />
      )}
      {flag && (
        <motion.small className="absolute -right-4 -translate-y-1/3 translate-x-full rounded-xl bg-gradient-to-b from-pink-700 to-red-400 px-3 py-2 text-base font-bold text-black">
          {flag}
        </motion.small>
      )}
    </h1>
  )
}

export default Heading
