"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
const IconBack = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
)
const PageNotFound = () => {
  const router = useRouter()
  const goBack = () => {
    router.push("/")
  }
  return (
    <div className="relative flex h-[90vh] w-full items-center justify-center">
      <button
        className="absolute left-5 top-5 z-10 flex cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-slate-600 px-4 py-3 text-sm text-white"
        onClick={goBack}
      >
        {IconBack}
        Go back
      </button>
      <Image
        src="/images/404.png"
        alt="page-not-found"
        fill
        className="object-cover"
      />
    </div>
  )
}

export default PageNotFound
