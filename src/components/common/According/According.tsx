import { Dispatch, SetStateAction, useState } from "react"

import { motion } from "framer-motion"

import { TCourseChapter } from "@/types"

type Props = {
  item: TCourseChapter
  Heading: ({
    chapter,
    isOpen,
    type,
  }: {
    chapter: TCourseChapter
    isOpen: boolean
    type?: "tracker"
  }) => JSX.Element
  children: React.ReactNode
  expand?: boolean
  setExpand: Dispatch<SetStateAction<string[]>>
  type?: "tracker"
}

const According = ({
  item,
  Heading,
  expand,
  setExpand,
  children,
  type,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(expand ?? false)
  return (
    <div>
      <button
        className="w-full rounded-lg bg-slate-800 p-4 hover:bg-slate-800/60"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Heading chapter={item} isOpen={isOpen} type={type} />
      </button>
      <div className="my-2 space-y-2">{isOpen && children}</div>
    </div>
  )
}

export default According
