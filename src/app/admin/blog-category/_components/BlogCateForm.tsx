import { ForwardedRef, forwardRef } from "react"

import { IconEdit, IconPlus, IconX } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

import Button from "@/components/common/Button"
import categoryApi from "@/api/client-side/categoryApi"
import { TAction, TCategory } from "@/types"

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string(),
  })
  .required()

type Props = {
  toggleForm: () => void
  action: TAction
  selectedRow: TCategory | {}
}
type FormData = yup.InferType<typeof schema>

const BlogCateForm = forwardRef(function CourseForm(
  { toggleForm, action, selectedRow }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: selectedRow,
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn:
      action === TAction.Add
        ? categoryApi.addCategory
        : categoryApi.updateCategory,
    onSuccess: (data) => {
      toggleForm()
      toast.success(data.message)
      reset()
      queryClient.invalidateQueries(["blog-categories"])
    },
    onError: (error) => {
      toast.error(error as string)
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate({ data, type: "blog" })
  }

  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-[40%] min-h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-900 px-10 pb-10 pt-5 shadow-xl"
    >
      <h2 className="relative mb-5 border-b border-gray-200/20 py-3 text-xl font-bold text-slate-200">
        Template Category
        <button
          className="absolute -right-8 top-0 -translate-y-1/2 hover:text-red-500"
          onClick={toggleForm}
        >
          <IconX />
        </button>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 grid gap-4 sm:grid-cols-2 [&_input:valid]:border-pink-500 [&_input]:outline-none [&_textarea]:outline-none">
          <div className="col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Tên danh mục
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Điền tên danh mục bài viết"
              required
            />
            <small className="font-bold capitalize text-pink-600">
              {errors.title?.message}
            </small>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Mô tả
            </label>
            <textarea
              {...register("description")}
              id="description"
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Điền mô tả cho danh mục bài viết"
            ></textarea>
          </div>
        </div>
        <Button
          className="sticky bottom-2 mx-auto mt-8 bg-pink-700"
          classStroke="stroke-pink-600"
          small
          type="submit"
          disabled={mutation.isLoading || !isDirty}
        >
          {action === TAction.Add ? (
            <>
              <IconPlus />
              <span>Thêm danh mục bài viết</span>
            </>
          ) : (
            <>
              <IconEdit />
              <span>Sửa danh mục bài viết</span>
            </>
          )}
        </Button>
      </form>
    </div>
  )
})

export default BlogCateForm
