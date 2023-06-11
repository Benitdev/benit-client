import React from "react"

import { UseFormRegister } from "react-hook-form"

type Props = {
  label: string
  options?: { value: string; label: string; disabled?: boolean }[]
  register: UseFormRegister<any>
  required?: boolean
}

const LABEL: {
  [key: string]: string
} = {
  categoryId: "danh mục",
  status: "trạng thái",
  feature: "đặc tính",
  type: "loại",
}

export default function Select({ label, options, register, required }: Props) {
  return (
    <select
      className="block w-full rounded-lg border p-2.5 text-sm text-gray-900 outline-none focus:border-pink-600 focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
      {...register(label, { required })}
    >
      {!required && (
        <option className="p-2" value="">
          Chọn {LABEL[label]}
        </option>
      )}
      {options?.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="p-2"
          disabled={option?.disabled ?? false}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
