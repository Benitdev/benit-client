import httpRequest from "@/lib/httpRequest"
import { TCategory, TCodeTemplate } from "@/types"
import filterObj from "@/utils/filterObj"

type Filter = {
  categoryId?: string
  authorId?: string
  status?: string
  likes?: string
}

const codeTemplateApi = {
  getCodes: (filter: Filter): Promise<TCodeTemplate[]> => {
    const filteredObj = filterObj(filter)
    const queryString = new URLSearchParams(filteredObj).toString()
    return httpRequest(`/code-template?${queryString}`, {
      next: {
        revalidate: 60,
      },
    })
  },

  getCodeCategories: (): Promise<TCategory[]> =>
    httpRequest(`/categories?type=code`, {
      next: {
        revalidate: 60,
      },
    }),
}

export default codeTemplateApi
