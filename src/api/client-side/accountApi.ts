// import { LoginForm } from 'types';
import axiosClient from "@/lib/axiosClient"

import type { ResSuccess, TUser } from "@/types"

const accountApi = {
  getAccounts: (type = "all"): Promise<TUser[]> =>
    axiosClient.get("/user/list", {
      params: {
        type,
      },
    }),
  updateAccount: (formData: any): Promise<ResSuccess> => {
    const { id, ...data } = formData
    return axiosClient.patch(`/user/${id}`, data)
  },
  deletePost: (id: string): Promise<ResSuccess> => {
    return axiosClient.delete(`/user/${id}`)
  },
}

export default accountApi
