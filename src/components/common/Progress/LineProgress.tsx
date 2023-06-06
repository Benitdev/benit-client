import React from "react"

type Props = {
  percent: number
}

export default function LineProgress({ percent }: Props) {
  return (
    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-2.5 rounded-full bg-pink-600"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
