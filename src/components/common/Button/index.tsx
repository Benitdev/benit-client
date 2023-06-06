import { cn } from "@/utils/cn"
import { ButtonHTMLAttributes } from "react"

type Props = {
  classStroke?: string
  className?: string
  scale?: boolean
  small?: boolean
  children: React.ReactNode
}

const Button = ({
  className,
  scale = true,
  classStroke,
  small,
  children,
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "glow-effect relative flex max-w-[300px] items-center justify-center gap-2 rounded-xl  font-bold tracking-wider drop-shadow-xl transition-transform duration-200",
        {
          "px-5 py-2 text-base": small,
          "px-10 py-3 text-xl": !small,
          "hover:scale-110": scale,
        },
        className
      )}
      {...props}
    >
      {children}
      <svg className="glow-container">
        <rect
          pathLength="100"
          strokeLinecap="round"
          className={cn("glow-blur", classStroke)}
        ></rect>
        <rect
          pathLength="100"
          strokeLinecap="round"
          className={cn("glow-line", classStroke)}
        ></rect>
      </svg>
    </button>
  )
}

export default Button
