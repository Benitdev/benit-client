import httpRequest from "@/lib/httpRequest"
import { TCategory, TCodeTemplate } from "@/types"

const codeTemplateApi = {
  getCodes: (categoryId: string): Promise<TCodeTemplate[]> =>
    httpRequest(`/code-template?categoryId=${categoryId ?? ""}`, {
      next: {
        revalidate: 60,
      },
    }),

  getCodeCategories: (): Promise<TCategory[]> =>
    httpRequest(`/categories?type=code`, {
      next: {
        revalidate: 60,
      },
    }),
}

export default codeTemplateApi
