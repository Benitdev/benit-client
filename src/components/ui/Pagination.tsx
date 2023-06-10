"use client"

import { cn } from "@/utils/cn"

import { IconArrowBadgeLeft, IconArrowBadgeRight } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

type Props = {
  page: number
  totalPage: number
}

export default function Pagination({ page, totalPage }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const tag = searchParams.get("tag")
  return totalPage ? (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-black/70 px-3 py-1">
      <div className="flex items-center gap-2 text-gray-400">
        <button disabled={page === 1}>
          {page !== 1 ? (
            <Link
              href={{
                pathname,
                query: {
                  id,
                  tag,
                  page: 1,
                },
              }}
            >
              <IconArrowBadgeLeft
                className={cn("h-4 w-4", {
                  "text-white": page !== 1,
                })}
              />
            </Link>
          ) : (
            <IconArrowBadgeLeft
              className={cn("h-4 w-4", {
                "text-white": page !== 1,
              })}
            />
          )}
        </button>
        {page > 4 ? (
          <>
            <button>1</button>
            <span>...</span>
          </>
        ) : null}
        {Array.from({ length: 5 }, (_, index: any) => {
          const pageIndex = page - 2 + index

          if (pageIndex > 0 && pageIndex <= totalPage)
            return (
              <Link
                href={{
                  pathname,
                  query: {
                    page: pageIndex,
                  },
                }}
                key={index}
              >
                <button
                  className={cn({
                    "text-white underline": pageIndex == page,
                  })}
                >
                  {pageIndex}
                </button>
              </Link>
            )
        })}
        {page < totalPage - 3 ? (
          <>
            <span>...</span>
            <Link
              href={{
                pathname,
                query: {
                  id,
                  tag,
                  page: totalPage,
                },
              }}
            >
              <button>{totalPage}</button>
            </Link>
          </>
        ) : null}
        <button disabled={page === totalPage}>
          {page !== totalPage ? (
            <Link
              href={{
                pathname,
                query: {
                  id,
                  tag,
                  page: page + 1,
                },
              }}
            >
              <IconArrowBadgeRight
                className={cn("h-4 w-4", {
                  "text-white": page !== totalPage,
                })}
              />
            </Link>
          ) : (
            <IconArrowBadgeRight
              className={cn("h-4 w-4", {
                "text-white": page !== totalPage,
              })}
            />
          )}
        </button>
      </div>
    </div>
  ) : null
}
