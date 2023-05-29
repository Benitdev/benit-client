import { useQuery } from "@tanstack/react-query"
import codeTemplateApi from "@/api/client-side/codeTemplateApi"
import { TFilter } from "@/types"

export const useCodeTemplate = (filter?: TFilter) =>
  useQuery({
    queryKey: ["code-template", filter],
    queryFn: () => codeTemplateApi.getTemplate(filter),
  })
