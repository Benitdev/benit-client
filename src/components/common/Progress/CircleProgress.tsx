import React from "react"

type Props = {
  percent: number
}

const CircleProgress = ({ percent }: Props) => {
  return (
    <div
      x-data="scrollProgress"
      className="inline-flex items-center justify-center overflow-hidden rounded-full"
    >
      <svg className="h-10 w-10">
        <circle
          className="text-gray-300"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r="15"
          cx="20"
          cy="20"
        />
        <circle
          className="text-pink-600"
          strokeWidth="3"
          strokeDasharray={100}
          strokeDashoffset={100 - percent}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="15"
          cx="20"
          cy="20"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-pink-600">
        {percent}%
      </span>
    </div>
  )
}

export default CircleProgress
