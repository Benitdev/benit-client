import { useMutation, useQuery } from "@tanstack/react-query"

import accountApi from "@/api/client-side/accountApi"
import authApi from "@/api/client-side/authApi"

export const useAccount = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: () => accountApi.getAccounts(),
  })

export const useLogout = ({ onSuccess }: { onSuccess?: () => void }) =>
  useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      onSuccess?.()
    },
  })
