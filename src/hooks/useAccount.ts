import accountApi from "@/api/client-side/accountApi"
import { useQuery } from "@tanstack/react-query"

export const useAccount = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: () => accountApi.getAccounts(),
  })
