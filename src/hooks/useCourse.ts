import courseApi from "@/api/courseApi"
import { useQuery } from "@tanstack/react-query"

export const useCourse = () =>
  useQuery({
    queryKey: ["courses"],
    queryFn: courseApi.getCourse,
  })
