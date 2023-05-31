import postApi from "@/api/server-side/postApi"
import ButtonAuth from "@/components/common/Button/ButtonAuth"
import Link from "next/link"

type Props = {}

export default async function PostFilter({}: Props) {
  const categories = await postApi.getPostCategories()

  return (
    <div className="flex items-center justify-center gap-4">
      <Link href={"/blogs"}>
        <ButtonAuth className="border border-pink-600/50 bg-pink-600 text-slate-900">
          Tất cả
        </ButtonAuth>
      </Link>

      {categories.map((category) => (
        <Link key={category._id} href={`/blogs?tag=${category.slug}`}>
          <ButtonAuth className="border border-pink-600/50 bg-pink-600/20">
            {category.title}
          </ButtonAuth>
        </Link>
      ))}
    </div>
  )
}
