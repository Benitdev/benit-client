import Link from "next/link"
import Button from "../Button"

type Props = {
  tag: {
    title: string
    _id: string
  }
}

export default function Tag({ tag }: Props) {
  return (
    <Button
      className="mx-auto bg-pink-700 text-sm"
      classStroke="stroke-pink-600"
      small
      scale={false}
    >
      <Link href={`/blogs?id=${tag._id}`}>{tag.title}</Link>
    </Button>
  )
}
