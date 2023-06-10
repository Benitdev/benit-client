import codeTemplateApi from "@/api/server-side/codeTemplateApi"
import CodeCard from "@/components/ui/CodeCard"
import Pagination from "@/components/ui/Pagination"

type Props = {
  categoryId: string
  type?: "my-code"
  userId?: string
  status?: string
  userFavorite?: string
  page?: number
}

export default async function CardList({
  categoryId,
  type,
  userId,
  status,
  userFavorite,
  page = 1,
}: Props) {
  const { data: codeList, lastPage } = await codeTemplateApi.getCodes({
    categoryId,
    authorId: type === "my-code" ? userId : "",
    status,
    likes: userFavorite,
    page,
  })
  console.log(page)
  if (codeList?.length === 0)
    return (
      <h1 className="text-center">Danh mục này hiện tại không có Template</h1>
    )
  return (
    <div className="grid grid-cols-1 gap-5 pb-10 md:grid-cols-2 lg:grid-cols-3">
      {codeList.map((card, i) => (
        <CodeCard
          key={card._id}
          cardId={card._id}
          title={card.title}
          htmlCode={card.htmlCode}
          cssCode={card.cssCode}
          jsCode={card.jsCode}
          author={card.authorId.fullName}
        />
      ))}
      <Pagination page={page} totalPage={lastPage} />
    </div>
  )
}
