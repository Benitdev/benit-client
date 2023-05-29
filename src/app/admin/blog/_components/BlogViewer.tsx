import { ForwardedRef, forwardRef } from "react"

import { IconX } from "@tabler/icons-react"
import Heading from "@/components/common/Heading"
import Image from "next/image"
import PostContent from "@/app/(default)/blogs/_components/PostContent"

type Props = {
  toggleForm: () => void
  selectedRow: any
}
const BlogViewer = forwardRef(function BlogViewer(
  { toggleForm, selectedRow }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-1/2 min-h-[500px] w-[80%] max-w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-900 px-10 pb-10 pt-5 shadow-xl"
    >
      <h2 className="relative mb-5 border-b border-gray-200/20 py-3 text-xl font-bold text-slate-200">
        Bài viết
        <button
          className="absolute -right-8 top-0 -translate-y-1/2 hover:text-red-500"
          onClick={toggleForm}
        >
          <IconX />
        </button>
      </h2>
      <div className="scrollbar-style relative max-h-[700px] overflow-y-auto p-2 lg:p-8">
        <div className="ck space-y-6">
          <Heading className="py-4 capitalize">{selectedRow.title}</Heading>
          <div className="relative h-[500px]">
            <Image
              src={selectedRow.image}
              alt={selectedRow.title}
              fill
              className="object-cover"
            />
          </div>
          <PostContent content={selectedRow.content} />
        </div>
        <div className="sticky top-0 col-span-3">cc</div>

        <div className="fixed left-11 top-[15%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/50 bg-gradient-to-tr blur-[200px]"></div>
        <div className="fixed bottom-[15%] right-11 -z-10 h-24 w-[40rem] rotate-45 bg-purple-600/60 bg-gradient-to-tr blur-[120px]"></div>

        <div className="bg-grid absolute inset-0 -z-10"></div>
      </div>
    </div>
  )
})

export default BlogViewer
