import codeTemplateApi from "@/api/server-side/codeTemplateApi"
import Banner from "./_components/Banner"
import CodeFilter from "./_components/CodeFilter"
import CardList from "./_components/CardList"
import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"

type Props = {
  searchParams: {
    type: string
    cateId: string
    page: string
  }
}

export default async function page({ searchParams }: Props) {
  const categories = await codeTemplateApi.getCodeCategories()

  return (
    <div className="relative p-8">
      <BreadCrumb
        segments={[
          {
            title: "Trang chủ",
            url: "/",
          },
          {
            title: "Code Template",
          },
        ]}
      />
      <Banner />
      <div className="rounded-xl bg-black/40 p-4 backdrop-blur-sm">
        <CodeFilter categories={categories} />
        {/* @ts-expect-error Async Server Component */}
        <CardList
          categoryId={searchParams.cateId}
          page={Number(searchParams.page ?? 1)}
        />
      </div>
    </div>
  )
}
