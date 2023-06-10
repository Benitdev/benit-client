// import { LoginForm } from 'types';
import axiosClient from "@/lib/axiosClient"
import type { Page, ResSuccess, TCodeTemplate, TFilter } from "@/types"

const codeTemplateApi = {
  getTemplate: (filter?: TFilter): Promise<Page<TCodeTemplate[]>> => {
    const filteredObj = Object.fromEntries(
      Object.entries(filter!).filter(([key, value]) => value !== "")
    )

    return axiosClient.get("/code-template", {
      params: filteredObj,
    })
  },
  addTemplate: (data: any): Promise<ResSuccess> =>
    axiosClient.post(`/code-template`, data),
  updateTemplate: (formData: any): Promise<ResSuccess> => {
    const { _id, ...data } = formData
    return axiosClient.patch(`/code-template/${_id}`, data)
  },
  deleteTemplate: (id: string): Promise<ResSuccess> => {
    return axiosClient.delete(`/code-template/${id}`)
  },
}

export default codeTemplateApi
