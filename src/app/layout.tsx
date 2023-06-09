import "@/styles/globals.css"

import { Inter, Open_Sans } from "next/font/google"
import ReactQueryProvider from "@/contexts/ReactQueryProvider"
import ToastContainer from "@/components/common/Toast/ToastContainer"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["vietnamese"],
  display: "swap",
})

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["vietnamese"],
  display: "swap",
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable} dark`}>
      <body className="bg-slate-900 text-base text-slate-200">
        <ReactQueryProvider>
          <div id="root">{children}</div>
        </ReactQueryProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
