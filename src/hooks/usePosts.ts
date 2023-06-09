import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import postApi from "@/api/client-side/postApi"
import { TFilter } from "@/types"
import { toast } from "react-toastify"

export const usePosts = (filter?: TFilter) =>
  useQuery({
    queryKey: ["posts", filter],
    queryFn: () => postApi.getPost(filter),
  })

export const useFavoritePost = ({
  postId,
  onSuccess,
}: {
  postId: string
  onSuccess?: any
}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postApi.favoritePost,
    onMutate: () => {
      queryClient.cancelQueries(["favorite", postId])
      queryClient.setQueryData(["favorite", postId], { liked: true })
    },
    onError: (err: any) => {
      queryClient.setQueryData(["favorite", postId], { liked: false })
      toast.error(err.response.status === 401 ? "Vui lòng đăng nhập!" : "Lỗi!")
    },
    onSettled: (data) => {
      onSuccess?.()
      queryClient.invalidateQueries(["favorite", postId])
      toast.success(data?.message)
    },
  })
}

export const useLikedPost = (postId: string, type?: string) =>
  useQuery({
    queryKey: ["favorite", postId, type],
    queryFn: () => postApi.getFavoritePost(postId, type),
  })
