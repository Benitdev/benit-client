import { useQuery } from "@tanstack/react-query"

import postApi from "@/api/client-side/postApi"
import { TFilter } from "@/types"

export const usePosts = (filter?: TFilter) =>
  useQuery({
    queryKey: ["posts", filter],
    queryFn: () => postApi.getPost(filter),
  })
