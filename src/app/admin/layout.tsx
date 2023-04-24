import authApi from "@/api/server-side/auth.api"
import Sidebar from "./_components/Sidebar"
import Header from "./_components/Header"
import ReactQueryProvider from "@/contexts/ReactQueryProvider"
import ToastContainer from "./_components/Toast/ToastContainer"

export const metadata = {
  title: {
    default: "Welcome to Benit dashboard",
    template: "%s | Admin",
  },
  description: "Admin dashboard for website Benit! hihi",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await authApi.getUser().catch(() => {})

  return (
    <div className="relative h-screen text-slate-200">
      <Header />
      <ReactQueryProvider>
        <div className="flex">
          <Sidebar />
          <section className="scrollbar-style h-[calc(100vh-90px)] flex-1 overflow-y-auto overflow-x-hidden rounded-tl-2xl bg-black/40 p-5">
            <div className="min-h-full rounded-xl bg-slate-900">{children}</div>
          </section>
        </div>
      </ReactQueryProvider>
      <ToastContainer />
    </div>
  )
}
