"use client"

import postApi from "@/api/client-side/postApi"
import { useEffect } from "react"

type Props = {
  postId: string
}

export default function IncrementView({ postId }: Props) {
  useEffect(() => {
    try {
      postApi.updateView(postId)
    } catch {}
  })
  return <></>
}
