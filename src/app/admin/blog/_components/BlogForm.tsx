import { ForwardedRef, forwardRef, useState } from "react"

import { IconEdit, IconPlus, IconX } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

import Button from "@/components/common/Button"
import { TAction } from "@/types"
import Select from "@/components/common/Select"
import { POST_STATUS_OPTIONS, STATUS_OPTIONS } from "@/constants/options"
import courseApi from "@/api/client-side/courseApi"
import Image from "next/image"
import ImageSkeleton from "@/components/common/Skeleton/ImageSkeleton"
import Editor from "@/components/ui/Editor"
import postApi from "@/api/client-side/postApi"

const schema = yup
  .object({
    title: yup.string(),
    // tags: yup.string(),
    authorId: yup.string(),
    image: yup.string().required("Ảnh bìa là bắt buộc!"),
    status: yup.string().required("Trạng thái là bắt buộc"),
  })
  .required()

type Props = {
  toggleForm: () => void
  action: TAction
  selectedRow: any | {}
}
type FormData = yup.InferType<typeof schema>

const AccountForm = forwardRef(function CourseForm(
  { toggleForm, action, selectedRow }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues:
      action === TAction.Edit
        ? { ...selectedRow, authorId: selectedRow.authorId._id }
        : {},
  })

  const imagePath = watch("image")

  const [content, setContent] = useState<string>(
    action === TAction.Edit ? selectedRow.content : ""
  )

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn:
      action === TAction.Add ? postApi.createPost : postApi.updatePost,
    onSuccess: (data) => {
      toggleForm()
      toast.success(data.message)
      reset()
      queryClient.invalidateQueries(["posts"])
    },
    onError: (error) => {
      toast.error(error as string)
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate({ ...data, content })
  }

  const uploadMutation = useMutation({
    mutationFn: courseApi.uploadImage,
    onSuccess: (data) => {
      setValue("image", data.imagePath, { shouldDirty: true })
    },
    onError: (error: any) => {
      toast.error(error.error as string)
    },
  })

  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-1/2 min-h-[500px] w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-900 px-10 pb-10 pt-5 shadow-xl"
    >
      <h2 className="relative mb-5 border-b border-gray-200/20 py-3 text-xl font-bold text-slate-200">
        Bài viết
        <button
          className="absolute -right-8 top-0 -translate-y-1/2 hover:text-red-500"
          onClick={toggleForm}
        >
          <IconX />
        </button>
      </h2>
      <form
        className="scrollbar-style max-h-[700px] overflow-y-auto pr-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 grid gap-4 sm:grid-cols-2 [&_input:valid]:border-pink-500 [&_input]:outline-none [&_textarea]:outline-none">
          <div className="col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Tiêu đề bài viết
            </label>
            <input
              {...register("title")}
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Điền tiêu đề bài viết"
              required
            />
            <small className="font-bold capitalize text-pink-600">
              {errors.title?.message}
            </small>
          </div>
          <div className="col-span-2">
            <Editor data={content} setContent={setContent} />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Ảnh bìa
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="font-bold text-pink-700"
              onChange={(e) =>
                uploadMutation.mutate(e.target.files?.[0] as File)
              }
            />
            {uploadMutation.isLoading && !uploadMutation.isIdle && (
              <ImageSkeleton />
            )}
            {!uploadMutation.isLoading && imagePath && (
              <Image
                src={imagePath}
                height={240}
                width={350}
                alt=""
                className="mx-auto mt-2 object-cover"
              />
            )}
          </div>
          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Trạng thái
            </label>
            <Select
              label="status"
              register={register}
              required
              options={POST_STATUS_OPTIONS}
            />
            <small className="font-bold capitalize text-pink-600">
              {errors.status?.message}
            </small>
          </div>
        </div>
        <Button
          className="mx-auto mt-8 bg-pink-700"
          classStroke="stroke-pink-600"
          small
          type="submit"
          disabled={mutation.isLoading || !isDirty}
        >
          {action === TAction.Add ? (
            <>
              <IconPlus />
              <span>Thêm bài viết</span>
            </>
          ) : (
            <>
              <IconEdit />
              <span>Sửa bài viết</span>
            </>
          )}
        </Button>
      </form>
    </div>
  )
})

export default AccountForm
