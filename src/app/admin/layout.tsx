import authApi from "@/apis/server-side/auth.api"
import Sidebar from "./_components/Sidebar"
import Header from "./_components/Header"

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
    <div className="relative overflow-hidden text-slate-200">
      <Header />
      <div className="flex gap-4">
        <Sidebar />
        <section className="flex-1 rounded-tl-2xl bg-black/40 p-5">
          <div className="h-full rounded-xl bg-slate-900">{children}</div>
        </section>
      </div>
      {/* circle shape */}
      {/*     <div className="absolute left-11 top-[15%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/70 bg-gradient-to-tr blur-[200px]"></div>
      <div className="absolute bottom-[15%] right-11 -z-10 h-24 w-[40rem] rotate-45 bg-purple-600/60 bg-gradient-to-tr blur-[120px]"></div>
      <div className="absolute right-0 top-0 -z-10 h-[30rem] w-[30rem] -translate-y-1/2 translate-x-1/2 rotate-45 bg-orange-700/20 bg-gradient-to-tr blur-[100px]"></div> */}
      {/* <div className="bg-grid absolute inset-0 -z-10"></div> */}
    </div>
  )
}
