import { useQuery } from "@tanstack/react-query"
import codeTemplateApi from "@/api/client-side/codeTemplateApi"

export const useCodeTemplate = () =>
  useQuery({
    queryKey: ["code-template"],
    queryFn: codeTemplateApi.getTemplate,
  })
