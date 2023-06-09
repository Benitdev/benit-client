"use client"

import authApi from "@/api/client-side/authApi"
import { cn } from "@/utils/cn"
import { useRouter } from "next/navigation"

type Props = {
  url?: string
  className?: string
  onClick?: any
  children: React.ReactNode
}

const ButtonAuth = ({ className, onClick, url, children }: Props) => {
  const router = useRouter()

  const openWindowSocialLogin = (url: string) => {
    let timer: NodeJS.Timeout | null = null
    const y = window.top!.outerHeight / 2 + window.top!.screenY - 600 / 2
    const x = window.top!.outerWidth / 2 + window.top!.screenX - 600 / 2
    const newWindow = window.open(
      url,
      "_blank",
      `width=600, height=600, top=${y}, left=${x}`
    )

    const checkAuth = async () => {
      try {
        await authApi.getUser()
        router.refresh()
        router.push("/")
      } catch (err) {
        console.log(err)
      }
    }
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("log successfully")
          checkAuth()
          if (timer) clearInterval(timer)
        }
      }, 500)
    }
  }

  return (
    <button
      className={cn(
        "button-effect flex items-center rounded-lg px-3 py-1 font-bold tracking-wider drop-shadow-xl transition-transform duration-200",
        className
      )}
      onClick={url ? () => openWindowSocialLogin(url as string) : onClick}
    >
      {children}
    </button>
  )
}

export default ButtonAuth
