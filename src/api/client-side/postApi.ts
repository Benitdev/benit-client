// import { LoginForm } from 'types';
import axiosClient from "@/lib/axiosClient"

import type { TFilter, ResSuccess, TPost } from "@/types"

const postApi = {
  getPost: (filter?: TFilter): Promise<TPost[]> => {
    const filteredObj = Object.fromEntries(
      Object.entries(filter!).filter(([key, value]) => value !== "")
    )

    return axiosClient.get("/posts", {
      params: filteredObj,
    })
  },
  createPost: (formData: any): Promise<ResSuccess> => {
    return axiosClient.post(`/posts`, formData)
  },
  updatePost: (formData: any): Promise<ResSuccess> => {
    const { _id, ...data } = formData
    return axiosClient.put(`/posts/${_id}`, data)
  },
  deletePost: (id: string): Promise<ResSuccess> => {
    return axiosClient.delete(`/posts/${id}`)
  },
}

export default postApi
