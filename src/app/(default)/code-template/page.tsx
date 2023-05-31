import codeTemplateApi from "@/api/server-side/codeTemplateApi"
import Banner from "./_components/Banner"
import CodeFilter from "./_components/CodeFilter"
import CardList from "./_components/CardList"
import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"

type Props = {
  searchParams: {
    type: string
    cateId: string
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
        <CardList categoryId={searchParams.cateId} />
      </div>
      {/* background grid  */}
      <div className="absolute left-11 top-[15%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/70 bg-gradient-to-tr blur-[200px]"></div>
      <div className="absolute bottom-[15%] right-11 -z-10 h-24 w-[40rem] rotate-45 bg-purple-600/60 bg-gradient-to-tr blur-[120px]"></div>
      <div className="absolute right-0 top-0 -z-10 h-[30rem] w-[30rem] -translate-y-1/2 translate-x-1/2 rotate-45 bg-orange-700/30 bg-gradient-to-tr blur-[100px]"></div>
      <div className="bg-grid absolute inset-0 -z-10"></div>
    </div>
  )
}
