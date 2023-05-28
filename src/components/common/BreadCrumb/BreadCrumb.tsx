"use client"

import { cn } from "@/utils/cn"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
  segments: { title: string; url?: string }[]
}

export default function BreadCrumb({ segments }: Props) {
  const pathname = usePathname()
  return (
    <div>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          {segments.map((segment, index) => (
            <li key={segment.title} className="inline-flex items-center">
              <Link
                href={segment.url ?? pathname}
                className={cn(
                  "inline-flex items-center text-sm font-medium text-gray-400 dark:hover:text-pink-600",
                  index === segments.length - 1 &&
                    "text-pink-600 underline underline-offset-2"
                )}
              >
                {index === 0 ? (
                  <svg
                    aria-hidden="true"
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
                {segment.title}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
