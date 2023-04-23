import { ForwardedRef, forwardRef } from "react"

import { IconPlus, IconX } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import Button from "@/components/common/Button"

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required()

type Props = {
  handleClose: () => void
}
const CourseForm = forwardRef(function CourseForm(
  { handleClose }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-[40%] min-h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-900 px-10 pb-10 pt-5 shadow-xl"
    >
      <h2 className="relative mb-5 border-b border-gray-200/20 py-3 text-xl font-bold text-slate-200">
        Add Course
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-red-500"
          onClick={handleClose}
        >
          <IconX />
        </button>
      </h2>
      <form action="#">
        <div className="mb-4 grid gap-4 sm:grid-cols-2 [&_input:valid]:border-pink-500 [&_input]:outline-none [&_textarea]:outline-none">
          <div className="col-span-2">
            <label
              htmlFor="title"
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              className="text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Type product name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="brand"
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Brand
            </label>
            <input
              {...register("brand")}
              type="text"
              id="brand"
              className="text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-pink-600 focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Product brand"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-pink-600 focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="$2999"
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="category"
              className="text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-pink-500 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
            >
              <option selected>Select category</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-pink-500 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Write product description here"
            ></textarea>
          </div>
        </div>
        <Button
          className="bg-pink-700"
          classStroke="stroke-pink-600"
          small
          // onClick={() => setIsOpenForm(true)}
        >
          <IconPlus />
          <span>Add new course</span>
        </Button>
      </form>
    </div>
  )
})

export default CourseForm
