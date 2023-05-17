import { AxiosError } from "axios"
import { toast } from "react-toastify"

export const toastErrorUtil = (error: unknown, defaultMsg: string) => {
  const errorMessage =
    error instanceof AxiosError ? error?.response?.data.message : defaultMsg

  toast.error(errorMessage)
}
