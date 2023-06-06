import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"
import Heading from "@/components/common/Heading/Heading"
import CourseList from "@/components/ui/CourseList"
import React from "react"

type Props = {}

export default function CoursesPage({}: Props) {
  return (
    <div className="relative p-8">
      <BreadCrumb
        segments={[
          {
            title: "Trang chủ",
            url: "/",
          },
          {
            title: "Khoá học",
          },
        ]}
      />
      <div className="mt-6 space-y-4">
        <Heading>Khoá học</Heading>
        <p>
          Các khóa học được thiết kế phù hợp cho cả người mới, nhiều khóa học
          miễn phí, chất lượng, nội dung dễ hiểu.
        </p>
      </div>
      {/* @ts-expect-error Async Server Component */}
      <CourseList />
    </div>
  )
}
