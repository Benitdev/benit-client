import authApi from "@/api/server-side/authApi"
import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"
import Footer from "@/components/ui/Footer"
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
        <div className="relative min-h-screen flex-1 pb-28">
          {children}
          {/* background grid  */}
          <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
            <div className="absolute left-11 top-[15%]  h-32 w-[50rem] -rotate-45 bg-pink-600/80 bg-gradient-to-tr blur-[200px]"></div>
            <div className="absolute bottom-[15%] right-11 h-24 w-[40rem] rotate-45 bg-purple-600/70 bg-gradient-to-tr blur-[120px]"></div>
            <div className="absolute right-[100px] top-0  h-[30rem] w-[30rem] -translate-y-1/2 translate-x-1/2 rotate-45 bg-orange-700/30 bg-gradient-to-tr blur-[100px]"></div>
            <div className="bg-grid absolute inset-0 "></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
