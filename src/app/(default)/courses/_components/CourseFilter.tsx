import Link from "next/link"

import postApi from "@/api/server-side/postApi"
import ButtonAuth from "@/components/common/Button/ButtonAuth"
import { cn } from "@/utils/cn"
import courseApi from "@/api/server-side/courseApi"

type Props = {
  categoryId?: string
  type?: "my-courses" | "courses"
}

export default async function CourseFilter({
  categoryId,
  type = "courses",
}: Props) {
  const categories = await courseApi.getCourseCategories()
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Link href={`/${type}`}>
        <ButtonAuth
          className={cn(
            "border border-pink-600/50 bg-pink-600/20",
            !categoryId && "border-pink-600/50 bg-pink-600 text-slate-900"
          )}
        >
          Tất cả
        </ButtonAuth>
      </Link>

      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/${type}?tag=${category.slug}&id=${category._id}`}
        >
          <ButtonAuth
            className={cn(
              "border border-pink-600/50 bg-pink-600/20",
              categoryId === category._id &&
                "border-pink-600/50 bg-pink-600 text-slate-900"
            )}
          >
            {category.title}
          </ButtonAuth>
        </Link>
      ))}
    </div>
  )
}
