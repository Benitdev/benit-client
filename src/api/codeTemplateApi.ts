// import { LoginForm } from 'types';
import axiosClient from "@/lib/axiosClient"
import type { ResSuccess } from "@/types"

const codeTemplateApi = {
  getTemplate: (): Promise<any> => axiosClient.get("/code-template"),
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
