// import { LoginForm } from 'types';
import axiosClient from "@/lib/axiosClient"

import type { TCategory, ResSuccess } from "@/types"

const categoryApi = {
  getCategory: ({ queryKey: [, type = "all"] }): Promise<TCategory[]> =>
    axiosClient.get("/categories", {
      params: {
        type,
      },
    }),
  addCategory: ({
    data,
    type,
  }: {
    data: any
    type: string
  }): Promise<ResSuccess> => axiosClient.post(`/categories`, { ...data, type }),
  updateCategory: (formData: any): Promise<ResSuccess> => {
    const { _id, ...data } = formData.data
    console.log(formData)
    return axiosClient.patch(`/categories/${_id}`, data)
  },
  delete: (id: string): Promise<ResSuccess> => {
    return axiosClient.delete(`/categories/${id}`)
  },
}

export default categoryApi
