/* eslint-disable react/no-unescaped-entities */
import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"
import HeadingCloseTag from "@/components/common/Heading/HeadingCloseTag"
import { cn } from "@/utils/cn"
import Image from "next/image"
import Link from "next/link"
import RoadMapList from "./_components/RoadMapList"

type Props = {
  searchParams: {
    type?: "frontend" | "backend"
  }
}

export default function RoadMapPage({ searchParams }: Props) {
  const type = searchParams.type ?? "frontend"

  return (
    <div className="relative p-8">
      <BreadCrumb
        segments={[
          {
            title: "Trang chủ",
            url: "/",
          },
          {
            title: "Lộ trình học",
          },
        ]}
      />
      <div className="mb-4 mt-6 space-y-4">
        <HeadingCloseTag>Lộ trình học</HeadingCloseTag>
        <p className="max-w-[700px]">
          Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học.
          Ví dụ: Để đi làm với vị trí "Lập trình viên Front-end" bạn nên tập
          trung vào lộ trình "Front-end". Lộ trình học Front-end.
        </p>
      </div>
      <div className="min-h-[400px] space-y-4">
        <div className="mt-8 flex items-center gap-3">
          <Link href={"/my-favorite?type=blog"}>
            <button
              className={cn(
                "font-bold hover:text-pink-600",
                type === "frontend" &&
                  "font-bold text-pink-600 underline underline-offset-1"
              )}
            >
              Lộ trình Frontend
            </button>
          </Link>
          <Link href={"/my-favorite?type=ui"}>
            <button
              className={cn(
                "font-bold hover:text-pink-600",
                type === "backend" &&
                  "font-bold text-pink-600 underline underline-offset-1"
              )}
            >
              Lộ trình Backend
            </button>
          </Link>
        </div>
        {/* @ts-expect-error  */}
        <RoadMapList type={type} />
        <Image
          src={"/images/card-group.png"}
          alt=""
          width={400}
          height={400}
          className="ml-auto"
        />
      </div>
    </div>
  )
}
