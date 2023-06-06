import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"
import HeadingCloseTag from "@/components/common/Heading/HeadingCloseTag"
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
        <HeadingCloseTag>{"<Khoá học của tôi />"}</HeadingCloseTag>

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
    </div>
  )
}
