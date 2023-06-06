"use client"

import { MENU_ACCOUNT } from "@/constants/menu"
import { TUser } from "@/types"
import Tippy from "@tippyjs/react/headless"
import Link from "next/link"
import { useState } from "react"

type Props = {
  user: TUser
  children: React.ReactElement
}

export default function AvatarTippy({ user, children }: Props) {
  const [visible, setVisible] = useState<boolean>(false)

  const togglePopup = () => setVisible((prev) => !prev)

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
