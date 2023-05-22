import courseApi from "@/api/client-side/courseApi"
import { useQuery } from "@tanstack/react-query"

export const useCourse = () =>
  useQuery({
    queryKey: ["courses"],
    queryFn: courseApi.getCourses,
  })
