import { useQuery } from "@tanstack/react-query"

import searchApi from "@/api/client-side/searchApi"

export const useStatistical = (filter: {
  startDate: string
  endDate: string
}) =>
  useQuery({
    queryKey: ["statistical", filter],
    queryFn: () => searchApi.statistical(filter),
  })
