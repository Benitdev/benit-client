import { useQuery } from "@tanstack/react-query"

import accountApi from "@/api/accountApi"

export const useAccount = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: () => accountApi.getAccounts(),
  })
