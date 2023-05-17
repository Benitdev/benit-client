import authApi from "@/api/authApi"
import Header from "@/components/ui/Header"
import Sidebar from "@/components/ui/Sidebar"

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
