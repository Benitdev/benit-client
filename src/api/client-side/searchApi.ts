import axiosClient from "@/lib/axiosClient"
import { TCourse, TPost } from "@/types"

type Filter = {
  text?: string
}
const searchApi = {
  search: (filter: Filter): Promise<{ posts: TPost[]; courses: TCourse[] }> =>
    axiosClient.get(`/search`, {
      params: filter,
    }),
}

export default searchApi
