import authApi from "@/api/server-side/authApi"
import Header from "@/components/ui/Header"
import Sidebar from "@/components/ui/Sidebar"

export const metadata = {
  title: {
    default: "Welcome to Benit",
    template: "%s | Benit",
  },
  description: "Welcome to Benit website! hihi",
}

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await authApi.getUser()
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
