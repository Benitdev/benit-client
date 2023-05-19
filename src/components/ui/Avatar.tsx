"use client"

import clsx from "clsx"
import Image from "next/image"
import React from "react"

const colors = ["#ffa400", "#fc6c7f", "#6a5af9", "#d66efd"]
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
const Avatar = ({ className = "", user }: any) => {
  // const color = getRandomColor()
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full border-slate-500 bg-pink-700 font-bold uppercase",
        className
      )}
      /*   style={{
        backgroundColor: color,
      }} */
    >
      <div className="relative h-[40px] w-[40px] overflow-hidden rounded-full">
        <Image src={user.avatar} alt="avatar" width={40} height={40} />
      </div>
    </div>
  )
}

export default Avatar
