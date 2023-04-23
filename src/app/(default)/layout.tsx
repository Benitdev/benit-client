import Header from "@/components/ui/Header"
import Sidebar from "@/components/ui/Sidebar"
import authApi from "@/api/server-side/auth.api"

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await authApi.getUser().catch(() => {})

  return (
    <>
      <Header user={user} />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </>
  )
}
