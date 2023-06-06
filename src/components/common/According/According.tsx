import { useState } from "react"

type Props = {
  item: any
  Heading: (props: any) => JSX.Element
  children: React.ReactNode
  expand?: boolean
  type?: "tracker"
}

const According = ({ item, Heading, expand, children, type }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(expand ?? false)
  return (
    <div>
      <button
        className="w-full rounded-lg bg-slate-800 p-4 hover:bg-slate-800/60"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Heading
          chapter={item.chapter}
          lessonsLearned={item.lessonsLearned}
          isOpen={isOpen}
          type={type}
        />
      </button>
      <div className="my-2 space-y-2">{isOpen && children}</div>
    </div>
  )
}

export default According
