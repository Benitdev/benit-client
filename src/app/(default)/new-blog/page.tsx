"use client"

import { useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { IconMinus, IconPlus, IconSquareRoundedPlus } from "@tabler/icons-react"
import { useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import * as yup from "yup"
import { ErrorMessage } from "@hookform/error-message"

import postApi from "@/api/client-side/postApi"
import Button from "@/components/common/Button"
import Editor from "@/components/ui/Editor"
import { useFieldArray, useForm } from "react-hook-form"
import courseApi from "@/api/client-side/courseApi"
import ImageSkeleton from "@/components/common/Skeleton/ImageSkeleton"
import Image from "next/image"
import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"
import Select from "@/components/common/Select"
import { useCategory } from "@/hooks"
import { useRouter } from "next/navigation"
import HeadingCloseTag from "@/components/common/Heading/HeadingCloseTag"

type Props = {}

const schema = yup
  .object({
    title: yup.string().required("Tiêu đề là bắt buộc!"),
    tags: yup.array().required().of(yup.string().required("Tags là bắt buộc!")),
    content: yup.string().required("Nội dung là bắt buộc!"),
    image: yup.string().required("Ảnh bìa là bắt buộc!"),
    description: yup.string().required("Mô tả bài viết là bắt buộc!"),
  })
  .required()

type FormData = yup.InferType<typeof schema>

const NewBlog = (props: Props) => {
  const router = useRouter()
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { tags: [" "] },
  })

  const { data: categoryOptions, isLoading } = useCategory(
    "blog-categories",
    "blog"
  )

  const {
    fields: tagsFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags" as never,
  })

  const imagePath = watch("image")
  const content = watch("content")
  const tags = watch("tags")

  const mutation = useMutation({
    mutationFn: postApi.createPost,
    onSuccess: (data) => {
      toast.success(data.message)
      router.refresh()
      router.push("/my-blogs")
    },
    onError: (error: any) => {
      toast.error(error.message as string)
    },
  })

  const uploadMutation = useMutation({
    mutationFn: courseApi.uploadImage,
    onSuccess: (data) => {
      setValue("image", data.imagePath, { shouldDirty: true })
    },
    onError: () => {
      toast.error("Tải ảnh không thành công!")
    },
  })

  const setContent = (content: string) =>
    setValue("content", content, { shouldDirty: true })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-6 p-10">
      <BreadCrumb
        segments={[
          {
            title: "Trang chủ",
            url: "/",
          },
          {
            title: "Tạo bài viết",
          },
        ]}
      />
      <HeadingCloseTag>{"<Viết Blog />"}</HeadingCloseTag>
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
                <IconMinus className="h-3 w-3" />
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
      <div className="mb-4 grid gap-4 sm:grid-cols-2 [&_input:valid]:border-pink-500 [&_input]:outline-none [&_textarea]:outline-none">
        <Editor setContent={setContent} data={content} className="col-span-2" />
        <ErrorMessage
          errors={errors}
          name="content"
          render={({ message }) => (
            <small className="font-bold capitalize text-pink-600">
              {message}
            </small>
          )}
        />
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Ảnh bìa
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="font-bold text-pink-700"
            onChange={(e) => uploadMutation.mutate(e.target.files?.[0] as File)}
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
        <ErrorMessage
          errors={errors}
          name="image"
          render={({ message }) => (
            <small className="font-bold capitalize text-pink-600">
              {message}
            </small>
          )}
        />
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
      <Button
        type="submit"
        small
        classStroke="stroke-pink-600"
        className="sticky top-0 z-10 bg-pink-600/90"
        disabled={mutation.isLoading || !isDirty}
      >
        <IconSquareRoundedPlus className="h-6 w-6" />
        Xuất bản
      </Button>
    </form>
  )
}

export default NewBlog
