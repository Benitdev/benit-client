import clsx from "clsx"

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
}: Props) => {
  return (
    <button
      className={clsx(
        "glow-effect relative flex max-w-[300px] items-center justify-center gap-2 rounded-xl  font-bold tracking-wider drop-shadow-xl transition-transform duration-200",
        className,
        {
          "px-5 py-2 text-base": small,
          "px-10 py-3 text-xl": !small,
          "hover:scale-110": scale,
        }
      )}
    >
      {children}
      <svg className="glow-container">
        <rect
          pathLength="100"
          strokeLinecap="round"
          className={clsx("glow-blur", classStroke)}
        ></rect>
        <rect
          pathLength="100"
          strokeLinecap="round"
          className={clsx("glow-line", classStroke)}
        ></rect>
      </svg>
    </button>
  )
}

export default Button
