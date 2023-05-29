import { useQuery } from "@tanstack/react-query"

import courseApi from "@/api/client-side/courseApi"
import { TFilter } from "@/types"

export const useCourse = (filter?: TFilter) =>
  useQuery({
    queryKey: ["courses", filter],
    queryFn: () => courseApi.getCourses(filter),
  })
