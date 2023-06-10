// import { LoginForm } from 'types';
import axiosClient from "@/lib/axiosClient"

import type { TFilter, ResSuccess, TPost, Page } from "@/types"

const postApi = {
  getPost: (filter?: TFilter): Promise<Page<TPost[]>> => {
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

  favoritePost: ({
    id,
    action,
    type,
  }: {
    id: string
    action?: string
    type?: string
  }): Promise<ResSuccess> => {
    return axiosClient.post(
      `/posts/favorite/${id}?action=${action}&type=${type}`
    )
  },

  getFavoritePost: (id: string, type?: string): Promise<any> => {
    return axiosClient.get(`/posts/favorite/${id}`, {
      params: {
        type,
      },
    })
  },
  updateView: (id: string): Promise<ResSuccess> => {
    return axiosClient.get(`/posts/views/${id}`)
  },
}

export default postApi
