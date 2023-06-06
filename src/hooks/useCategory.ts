import categoryApi from "@/api/client-side/categoryApi"
import { useQuery } from "@tanstack/react-query"

export const useCategory = (
  key: string,
  type: string,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: [key, type],
    queryFn: categoryApi.getCategory,
    enabled,
  })
