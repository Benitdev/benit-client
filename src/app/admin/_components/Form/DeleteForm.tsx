import { ForwardedRef, forwardRef } from "react"

import { IconX } from "@tabler/icons-react"
import { Button } from "@mui/material"

type Props = {
  toggleForm: () => void
  selectedRowId: string
  type: string
  handleDelete: any
}
const DeleteForm = forwardRef(function CourseForm(
  { toggleForm, selectedRowId, type, handleDelete }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-[40%] min-h-[200px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-900 px-10 pb-10 pt-5 shadow-xl"
    >
      <h2 className="relative mb-5 border-b border-gray-200/20 py-3 text-xl font-bold text-slate-200">
        Xoá {type}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-red-500"
          onClick={toggleForm}
        >
          <IconX />
        </button>
      </h2>
      <div className="flex justify-center gap-8">
        <Button className="bg- !px-6">Huỷ</Button>
        <Button
          className="!bg-red-600 !px-6 !font-bold !text-slate-900"
          onClick={() => handleDelete(selectedRowId)}
        >
          Xoá
        </Button>
      </div>
    </div>
  )
})

export default DeleteForm
