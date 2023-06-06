import Link from "next/link"
import { notFound } from "next/navigation"

import authApi from "@/api/server-side/authApi"
import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"
import Button from "@/components/common/Button"
import Heading from "@/components/common/Heading/Heading"
import codeTemplateApi from "@/api/server-side/codeTemplateApi"
import CodeFilter from "../code-template/_components/CodeFilter"
import CardList from "../code-template/_components/CardList"

type Props = {
  searchParams: {
    cateId: string
  }
}

export default async function MyUiPage({ searchParams }: Props) {
  const user = await authApi.getUser()
  if (!user) notFound()

  const categories = await codeTemplateApi.getCodeCategories()

  return (
    <div className="relative overflow-hidden p-8">
      <BreadCrumb
        segments={[
          {
            title: "Trang chủ",
            url: "/",
          },
          {
            title: "UI Component của tôi",
          },
        ]}
      />
      <div className="space-y-6">
        <div className="space-y-4 py-6 lg:pr-5">
          <Heading className="text-center">UI Component của tôi</Heading>
          <p className="text-center">
            Nơi chia sẽ những giao diện, Component, UI đẹp mắt ...
          </p>
        </div>
        <Link href={"/new-code"} className="mx-auto block w-fit">
          <Button
            classStroke="stroke-pink-600"
            small
            className="sticky top-0 z-10 bg-pink-600/90"
          >
            Tạo UI Component
          </Button>
        </Link>
      </div>
      <div className="mt-10 rounded-xl bg-black/40 p-4 backdrop-blur-sm">
        <CodeFilter categories={categories} page="my-code" />
        {/* @ts-expect-error Async Server Component */}
        <CardList
          type="my-code"
          categoryId={searchParams.cateId}
          userId={user._id}
        />
      </div>
    </div>
  )
}
