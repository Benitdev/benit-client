"use client"

import { TCategory } from "@/types"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

type Props = {
  categories: TCategory[]
  page?: "my-code" | "code-template"
}

export default function CodeFilter({
  categories,
  page = "code-template",
}: Props) {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  return (
    <div className="mb-10 flex items-center justify-between border-b border-b-slate-800 ">
      <div
        className="scrollbar-style flex gap-x-3 overflow-x-auto whitespace-nowrap px-4 text-xl font-bold"
        aria-label="tab-v4"
      >
        <FilterItem
          item={{
            title: "all",
          }}
          href={`/${page}`}
          activeCard={type === null}
        ></FilterItem>
        {categories.map((item) => (
          <FilterItem
            key={item._id}
            activeCard={type === item.slug}
            item={item}
            href={`/${page}?type=${item.slug}&cateId=${item._id}`}
          />
        ))}
      </div>
      {/* <div>
    <InputCard
      name="filter"
      placeholder="Search by title"
      className="!p-2"
      onChange={(e: any) => setTitle(e.target.value)}
    ></InputCard>
  </div> */}
    </div>
  )
}

function FilterItem({ item, activeCard, href }: any) {
  return (
    <Link href={href}>
      <button
        className={`relative flex items-center p-2 text-sm font-medium capitalize lg:text-base ${
          activeCard
            ? "bg-gradient-primary pointer-events-none bg-clip-text text-transparent"
            : "text-slate-300"
        }`}
      >
        {item.title}
        {activeCard && (
          <motion.span
            layoutId="filter-menu-underline"
            className="bg-gradient-primary absolute bottom-0 left-0 right-0 h-1 rounded-xl"
          />
        )}
      </button>
    </Link>
  )
}
