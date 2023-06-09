import axiosClient from "@/lib/axiosClient"
import { Statistical, TCourse, TPost } from "@/types"

type Filter = {
  text?: string
}
const searchApi = {
  search: (filter: Filter): Promise<{ posts: TPost[]; courses: TCourse[] }> =>
    axiosClient.get(`/search`, {
      params: filter,
    }),
  statistical: (filter: {
    startDate: string
    endDate: string
  }): Promise<Statistical> =>
    axiosClient.get(`/statistical`, {
      params: filter,
    }),
}

export default searchApi
