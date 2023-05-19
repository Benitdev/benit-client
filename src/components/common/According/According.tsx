import { Dispatch, SetStateAction, useState } from "react"

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
        className="w-full rounded-lg bg-slate-800 p-4"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Heading chapter={item} isOpen={isOpen} type={type} />
      </button>
      <div>{isOpen && children}</div>
    </div>
  )
}

export default According
