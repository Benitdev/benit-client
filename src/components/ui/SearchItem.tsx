import { TCourse, TPost } from "@/types"
import Image from "next/image"
import Link from "next/link"

type Props = {
  item: TPost | TCourse
  type: "blogs" | "courses"
}

export default function SearchItem({ item, type }: Props) {
  return (
    <Link
      href={`/${type}/${item.slug}`}
      className="flex items-center gap-2 hover:font-bold hover:text-pink-600"
    >
      <Image
        src={item.image}
        alt=""
        width={50}
        height={50}
        className="shrink-0 rounded-full"
      />
      <span className="line-clamp-2">{item.title}</span>
    </Link>
  )
}
