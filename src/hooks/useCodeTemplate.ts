import { useQuery } from "@tanstack/react-query"
import codeTemplateApi from "@/api/codeTemplateApi"

export const useCodeTemplate = () =>
  useQuery({
    queryKey: ["code-template"],
    queryFn: codeTemplateApi.getTemplate,
  })
