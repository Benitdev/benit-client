"use client"
import Editor from "@/components/ui/Editor"
import { motion } from "framer-motion"

type Props = {}

const NewBlog = (props: Props) => {
  return (
    <section className="flex-1 space-y-6 p-10">
      <h1 className="relative bg-gradient-to-b from-pink-700 to-red-400 bg-clip-text pb-4 text-2xl font-bold text-transparent">
        {"<Viết Blog />"}
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
      {/* <Editor /> */}
    </section>
  )
}

export default NewBlog
