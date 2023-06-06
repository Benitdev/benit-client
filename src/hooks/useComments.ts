import commentApi, { CommentFilter } from "@/api/client-side/commentApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useComment = (filter: CommentFilter) =>
  useQuery({
    queryKey: ["comments", filter],
    queryFn: () => commentApi.getComments(filter),
  })

export const useMutateComment = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: commentApi.postComment,
    onSuccess: () => {
      onSuccess?.()
      queryClient.invalidateQueries(["comments"])
    },
    onError: () => {},
  })
}
