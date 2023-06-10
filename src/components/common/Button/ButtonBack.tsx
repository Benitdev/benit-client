"use client"

import { useRouter } from "next/navigation"

import { IconChevronLeft } from "@tabler/icons-react"
import { cn } from "@/utils/cn"

type Props = {
  className?: string
}
export default function ButtonBack({ className }: Props) {
  const router = useRouter()
  return (
    <button
      className={cn(
        "flex items-center gap-1 text-sm font-bold text-gray-200 hover:underline",
        className
      )}
      onClick={() => router.back()}
    >
      <IconChevronLeft className="h-5 w-5" />
      Quay về
    </button>
  )
}
