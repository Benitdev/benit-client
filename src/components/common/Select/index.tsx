import React from "react"

import { UseFormRegister } from "react-hook-form"

type Props = {
  label: string
  options?: { value: string; label: string }[]
  register: UseFormRegister<any>
  required: boolean
}

export default function Select({ label, options, register, required }: Props) {
  return (
    <select
      className="text-sm block w-full rounded-lg border p-2.5 text-gray-900 outline-none focus:border-pink-600 focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
      {...register(label, { required })}
    >
      <option className="p-2" value="">
        Choose a select
      </option>
      {options?.map((option) => (
        <option key={option.value} value={option.value} className="p-2">
          {option.label}
        </option>
      ))}
    </select>
  )
}
