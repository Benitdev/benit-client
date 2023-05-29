"use client"

import { useRouter } from "next/navigation"

import { IconChevronLeft } from "@tabler/icons-react"

export default function ButtonBack() {
  const router = useRouter()
  return (
    <button
      className="flex items-center gap-1 text-sm font-bold text-gray-200 hover:underline"
      onClick={() => router.back()}
    >
      <IconChevronLeft className="h-5 w-5" />
      Quay về
    </button>
  )
}
