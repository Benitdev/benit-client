import codeTemplateApi from "@/api/server-side/codeTemplateApi"
import CodeCard from "@/components/ui/CodeCard"

type Props = {
  categoryId: string
}

export default async function CardList({ categoryId }: Props) {
  const codeList = await codeTemplateApi.getCodes(categoryId)
  if (codeList.length === 0)
    return (
      <h1 className="text-center">Danh mục này hiện tại không có Template</h1>
    )
  return (
    <div className="grid grid-cols-codeList gap-5 pb-10">
      {codeList.map((card, i) => (
        <CodeCard
          key={card._id}
          title={card.title}
          htmlCode={card.htmlCode}
          cssCode={card.cssCode}
          jsCode={card.jsCode}
          author={card.authorId.fullName}
        />
      ))}
    </div>
  )
}
