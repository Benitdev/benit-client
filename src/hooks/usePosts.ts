import postApi from "@/api/client-side/postApi"
import { useQuery } from "@tanstack/react-query"

export const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: postApi.getPost,
  })
