import postApi from "@/api/postApi"
import { useQuery } from "@tanstack/react-query"

export const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: postApi.getPost,
  })
