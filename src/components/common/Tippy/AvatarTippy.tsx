"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import Tippy from "@tippyjs/react/headless"
import Cookies from "js-cookie"

import { MENU_ACCOUNT } from "@/constants/menu"
import { useLogout } from "@/hooks"
import { TUser } from "@/types"

type Props = {
  user: TUser
  children: React.ReactElement
}

export default function AvatarTippy({ user, children }: Props) {
  const router = useRouter()
  const [visible, setVisible] = useState<boolean>(false)

  const togglePopup = () => setVisible((prev) => !prev)

  const logout = useLogout({
    onSuccess: () => {
      Cookies.remove("x-auth-cookies")
      router.refresh()
    },
  })

  return (
    <Tippy
      visible={visible}
      interactive
      onClickOutside={togglePopup}
      render={(attrs) => (
        <div
          className="min-w-[250px] rounded-xl bg-slate-800 px-6 py-4 shadow-lg"
          tabIndex={-1}
          {...attrs}
        >
          <ul className="space-y-4">
            <li className="flex flex-col items-center border-b border-slate-200/30 py-4">
              <span>
                <span className="text-sm italic">xin chào </span>
                <span className="font-bold text-pink-700">{user.fullName}</span>
              </span>
              <span className="text-slate-300">{user.email}</span>
            </li>
            {MENU_ACCOUNT.map((menu) => (
              <li key={menu.href}>
                <Link href={menu.href} className="hover:text-pink-600">
                  {menu.label}
                </Link>
              </li>
            ))}
            <li
              className="cursor-pointer border-t border-slate-200/30 pt-4 hover:text-pink-600"
              onClick={() => logout.mutate()}
            >
              Đăng xuất
            </li>
          </ul>
        </div>
      )}
    >
      <div className="cursor-pointer" onClick={togglePopup}>
        {children}
      </div>
    </Tippy>
  )
}
