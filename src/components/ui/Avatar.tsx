import Image from "next/image"

import { cn } from "@/utils/cn"

const Avatar = ({ className = "", avatar }: any) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border-slate-500 bg-pink-700 font-bold uppercase",
        className
      )}
      /*   style={{
        backgroundColor: color,
      }} */
    >
      <div className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full">
        {avatar ? (
          <Image src={avatar} alt="avatar" width={40} height={40} />
        ) : (
          <span>T</span>
        )}
      </div>
    </div>
  )
}

export default Avatar
