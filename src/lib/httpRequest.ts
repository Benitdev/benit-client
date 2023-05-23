import { cookies } from "next/headers"

import { BASE_API_URL } from "@/configs/env"

const httpRequest = (url: string, isCredential = false) => {
  return fetch(BASE_API_URL + url, {
    headers: {
      "Content-Type": "application/json",
      authorization: isCredential
        ? `Bearer ${cookies().get("x-auth-cookies")?.value}`
        : "",
    },
    // cache: isCredential ? "no-store" : "force-cache",
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => res.data ?? res)
    .catch(() => null)
}

export default httpRequest
