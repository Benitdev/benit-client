import { cookies } from "next/headers"

import { BASE_API_URL } from "@/configs/env"

type Options = {
  isCredential?: boolean
}

const httpRequest = (
  url: string,
  { isCredential = false, ...options }: Options & globalThis.RequestInit = {}
) => {
  return fetch(BASE_API_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      authorization: isCredential
        ? `Bearer ${cookies().get("x-auth-cookies")?.value}`
        : "",
    },
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => (res?.data === undefined ? res : res.data))
    .catch(() => null)
}

export default httpRequest
