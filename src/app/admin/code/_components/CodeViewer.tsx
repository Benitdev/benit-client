import React, { ForwardedRef, forwardRef } from "react"

import { IconX } from "@tabler/icons-react"
import CodeCard from "@/components/ui/CodeCard"

type Props = {
  toggleForm: () => void
  selectedRow: any
}
const CodeViewer = forwardRef(function CodeViewer(
  { toggleForm, selectedRow }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-[40%] min-h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-900 px-10 pb-10 pt-5 shadow-xl"
    >
      <h2 className="relative mb-5 border-b border-gray-200/20 py-3 text-xl font-bold text-slate-200">
        Template
        <button
          className="absolute -right-8 top-0 -translate-y-1/2 hover:text-red-500"
          onClick={toggleForm}
        >
          <IconX />
        </button>
      </h2>
      <div className="scrollbar-style">
        <CodeCard
          title={selectedRow.title}
          htmlCode={selectedRow.htmlCode}
          cssCode={selectedRow.cssCode}
          jsCode={selectedRow.jsCode}
          author={selectedRow?.authorId?.fullName ?? ""}
          preview
        />
      </div>
    </div>
  )
})

export default CodeViewer
