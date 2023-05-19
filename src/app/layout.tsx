import "@/styles/globals.css"

import { Inter, Open_Sans } from "next/font/google"

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
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <body className="bg-slate-900 text-base text-slate-200">
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
