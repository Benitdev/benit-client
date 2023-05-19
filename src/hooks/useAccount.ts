import { useQuery } from "@tanstack/react-query"

import accountApi from "@/api/client-side/accountApi"

export const useAccount = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: () => accountApi.getAccounts(),
  })
