import { ForwardedRef, forwardRef, useState } from "react"

import { IconEdit, IconMinus, IconPlus, IconX } from "@tabler/icons-react"
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

import Button from "@/components/common/Button"
import { TAction, TPost } from "@/types"
import Select from "@/components/common/Select"
import {
  FEATURE_OPTIONS,
  POST_STATUS_OPTIONS,
  STATUS_OPTIONS,
} from "@/constants/options"
import courseApi from "@/api/client-side/courseApi"
import Image from "next/image"
import ImageSkeleton from "@/components/common/Skeleton/ImageSkeleton"
import Editor from "@/components/ui/Editor"
import postApi from "@/api/client-side/postApi"
import { ErrorMessage } from "@hookform/error-message"
import { useCategory } from "@/hooks"

const schema = yup
  .object({
    title: yup.string().required("Tiêu đề là bắt buộc!"),
    tags: yup
      .array()
      .of(yup.string().required("Tags là bắt buộc!"))
      .required("Tags là bắt buộc!"),
    authorId: yup.string(),
    image: yup.string().required("Ảnh bìa là bắt buộc!"),
    description: yup.string().required("Mô tả bài viết là bắt buộc!"),
    content: yup.string().required("Nội dung là bắt buộc!"),
    feature: yup.string().required("Tính chất là bắt buộc"),
    status: yup.string().required("Trạng thái là bắt buộc"),
  })
  .required()

type Props = {
  toggleForm: () => void
  action: TAction
  selectedRow: TPost
}
type FormData = yup.InferType<typeof schema>

const AccountForm = forwardRef(function CourseForm(
  { toggleForm, action, selectedRow }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    control,
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
        ? {
            ...selectedRow,
            authorId: selectedRow.authorId._id,
            tags: selectedRow.tags.map((tag) => tag._id),
          }
        : { tags: [" "], feature: "featured" },
  })
  const {
    fields: tagsFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags" as never,
  })

  const { data: categoryOptions, isLoading } = useCategory(
    "blog-categories",
    "blog"
  )

  const imagePath = watch("image")
  const content = watch("content")
  const tags = watch("tags")
  console.log(content)

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

  const setContent = (content: string) =>
    setValue("content", content, { shouldDirty: true })

  const onSubmit = (data: FormData) => {
    mutation.mutate({ ...data, content })
  }

  const uploadMutation = useMutation({
    mutationFn: courseApi.uploadImage,
    onSuccess: (data) => {
      setValue("image", data.imagePath, { shouldDirty: true })
    },
    onError: () => {
      toast.error("Tải ảnh không thành công!")
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
            />
            <ErrorMessage
              errors={errors}
              name="title"
              render={({ message }) => (
                <small className="font-bold capitalize text-pink-600">
                  {message}
                </small>
              )}
            />
          </div>
          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Tags
            </label>
            <div className="flex flex-wrap items-center gap-4">
              {tagsFields.map((field, index) => (
                <div key={field.id} className="relative">
                  <Select
                    label={`tags.${index}`}
                    register={register}
                    required
                    options={categoryOptions?.map((option) => ({
                      label: option.title,
                      value: option._id,
                      disabled: tags.includes(option._id),
                    }))}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`tags.${index}`}
                    render={({ message }) => (
                      <small className="absolute bottom-0 translate-y-full font-bold capitalize text-pink-600">
                        {message}
                      </small>
                    )}
                  />
                  <button
                    onClick={() => removeTag(index)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-pink-700 p-1"
                    type="button"
                  >
                    <IconMinus className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={() => appendTag("")}
                className="rounded-full bg-pink-700 p-1"
                type="button"
              >
                <IconPlus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Mô tả
            </label>
            <textarea
              {...register("description")}
              id="description"
              rows={3}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Viết mô tả khoá học tại đây"
            ></textarea>
            <ErrorMessage
              errors={errors}
              name="description"
              render={({ message }) => (
                <small className="font-bold capitalize text-pink-600">
                  {message}
                </small>
              )}
            />
          </div>
          <div className="col-span-2">
            <Editor data={content} setContent={setContent} />
          </div>

          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
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
              htmlFor="feature"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Đặc trưng
            </label>
            <Select
              label="feature"
              register={register}
              required
              options={FEATURE_OPTIONS}
            />
            <ErrorMessage
              errors={errors}
              name="feature"
              render={({ message }) => (
                <small className="font-bold capitalize text-pink-600">
                  {message}
                </small>
              )}
            />
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
            <ErrorMessage
              errors={errors}
              name="status"
              render={({ message }) => (
                <small className="font-bold capitalize text-pink-600">
                  {message}
                </small>
              )}
            />
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
