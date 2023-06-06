import postApi from "@/api/server-side/postApi"
import ButtonAuth from "@/components/common/Button/ButtonAuth"
import { cn } from "@/utils/cn"
import Link from "next/link"

type Props = {
  categoryId?: string
  type?: "my-blogs" | "blogs"
}

export default async function PostFilter({
  categoryId,
  type = "blogs",
}: Props) {
  const categories = await postApi.getPostCategories()
  return (
    <div className="flex items-center justify-center gap-4">
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
