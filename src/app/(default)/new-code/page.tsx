import { notFound } from "next/navigation"

import authApi from "@/api/server-side/authApi"
import NewCodePage from "./_components/NewCodePage"

type Props = {}

export default async function NewCode({}: Props) {
  const user = await authApi.getUser()
  if (!user) notFound()

  return <NewCodePage user={user} />
}
