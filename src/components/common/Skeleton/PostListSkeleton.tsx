import { IconArrowRight } from "@tabler/icons-react"
import ButtonAuth from "../Button/ButtonAuth"
import ImageSkeleton from "./ImageSkeleton"

export default function PostListSkeleton() {
  return (
    <ol className="relative mx-10 ml-20 mt-8 animate-pulse border-l border-gray-200 dark:border-gray-700 lg:ml-40">
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <li key={index} className="mb-10 ml-4 space-y-4">
            <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-gray-500 bg-gray-500 " />
            <time className="mb-1 -translate-x-full rounded-xl bg-gray-700 text-sm font-normal leading-none text-transparent">
              February 2022
            </time>
            <div className="flex gap-4">
              <div className="relative max-h-[300px] min-h-[200px] w-[250px] shrink-0 overflow-hidden rounded-xl">
                <ImageSkeleton />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="line-clamp-2 h-7 rounded-xl bg-gray-700 text-lg font-semibold"></h3>
                <p className="mb-4 line-clamp-3 rounded-xl bg-gray-700 text-base font-normal text-transparent">
                  Get access to over 20+ pages including a dashboard layout,
                  charts, kanban board, calendar, and pre-order E-commerce &
                  Marketing pages. kanban board, calendar, and pre-order
                  Marketing pages. kanban board, calendar, and pre-order
                  Marketing pages. kanban board, calendar, and pre-order
                </p>
                <div className="flex items-center gap-4">
                  <span className="rounded-xl bg-gray-700 font-bold text-pink-600 text-transparent">
                    Thien Phan
                  </span>
                  <span className="h-1 w-1 rounded-full bg-pink-600"></span>
                  <span className="rounded-xl bg-gray-700 text-transparent">
                    5 phut doc
                  </span>
                </div>
                <div className="mt-auto">
                  <ButtonAuth className="bg-black/50 px-6 py-2">
                    Đọc thêm
                    <IconArrowRight className="ml-2 h-4 w-4" />
                  </ButtonAuth>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ol>
  )
}
