import Image from "next/image"
import Link from "next/link"
import Button from "../common/Button/Button"

type Props = {}

const CourseItem = (props: Props) => {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-xl bg-slate-900/50">
      <div>
        <div className="relative h-[150px] overflow-hidden rounded-xl lg:h-[200px] xl:h-[250px]">
          <Image src="/images/7.png" alt="" fill className="object-cover" />
        </div>
        <div className="p-4">
          <h2 className="text-large font-bold text-slate-200">
            Kiến thức nhập môn IT
          </h2>
        </div>
      </div>
      <Link
        href={"/"}
        className="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <div className="translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <Button classStroke="stroke-slate-100" className="bg-slate-300" small>
            Xem khoá học
          </Button>
        </div>
      </Link>
    </div>
  )
}

export default CourseItem
