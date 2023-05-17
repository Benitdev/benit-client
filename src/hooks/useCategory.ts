import categoryApi from "@/api/categoryApi"
import { useQuery } from "@tanstack/react-query"

export const useCategory = (key: string, type: string) =>
  useQuery({
    queryKey: [key, type],
    queryFn: categoryApi.getCategory,
  })
