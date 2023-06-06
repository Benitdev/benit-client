import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"
import Heading from "@/components/common/Heading"
import CourseList from "@/components/ui/CourseList"
import React from "react"

type Props = {}

export default function MyCoursesPage({}: Props) {
  return (
    <div className="relative p-8">
      <BreadCrumb
        segments={[
          {
            title: "Trang chủ",
            url: "/",
          },
          {
            title: "Khoá học của tôi",
          },
        ]}
      />
      <div className="mt-6 space-y-4">
        <Heading>Khoá học của tôi</Heading>
        <p>
          Các khóa học được thiết kế phù hợp cho cả người mới, nhiều khóa học
          miễn phí, chất lượng, nội dung dễ hiểu.
        </p>
      </div>
      <div className="mt-8 space-y-2">
        <h2 className="text-xl text-slate-400 underline underline-offset-4">
          Chưa hoàn thành
        </h2>
        {/* @ts-expect-error Async Server Component */}
        <CourseList progress="learning" />
      </div>
      <div className="mt-8 space-y-2">
        <h2 className="text-xl text-slate-400 underline underline-offset-4">
          Đã hoàn thành
        </h2>
        {/* @ts-expect-error Async Server Component */}
        <CourseList progress="done" />
      </div>
      {/* background grid  */}
      <div className="absolute left-11 top-[15%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/70 bg-gradient-to-tr blur-[200px]" />
      <div className="absolute bottom-[15%] right-11 -z-10 h-24 w-[40rem] rotate-45 bg-purple-600/60 bg-gradient-to-tr blur-[120px]"></div>
      <div className="absolute right-0 top-0 -z-10 h-[30rem] w-[30rem] -translate-y-1/2 translate-x-1/2 rotate-45 bg-orange-700/30 bg-gradient-to-tr blur-[100px]"></div>
      <div className="bg-grid absolute inset-0 -z-10"></div>
    </div>
  )
}
