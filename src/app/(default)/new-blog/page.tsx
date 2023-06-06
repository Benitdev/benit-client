"use client"

import { useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { IconSquareRoundedPlus } from "@tabler/icons-react"
import { useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import * as yup from "yup"

import postApi from "@/api/client-side/postApi"
import Button from "@/components/common/Button"
import Editor from "@/components/ui/Editor"
import { useForm } from "react-hook-form"
import courseApi from "@/api/client-side/courseApi"
import ImageSkeleton from "@/components/common/Skeleton/ImageSkeleton"
import Image from "next/image"
import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"

type Props = {}

const schema = yup
  .object({
    title: yup.string(),
    // tags: yup.string(),
    image: yup.string().required("Ảnh bìa là bắt buộc!"),
    description: yup.string().required("Mô tả bài viết là bắt buộc!"),
  })
  .required()

type FormData = yup.InferType<typeof schema>

const NewBlog = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const [content, setContent] = useState("")
  const imagePath = watch("image")

  const mutation = useMutation({
    mutationFn: postApi.createPost,
    onSuccess: (data) => {
      reset()
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error as string)
    },
  })

  const uploadMutation = useMutation({
    mutationFn: courseApi.uploadImage,
    onSuccess: (data) => {
      setValue("image", data.imagePath, { shouldDirty: true })
    },
    onError: (error: any) => {
      toast.error(error.error as string)
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate({ ...data, content })
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
      <h1 className="relative bg-gradient-to-b from-pink-700 to-red-400 bg-clip-text pb-4 text-2xl font-bold text-transparent">
        {"<Viết Blog />"}
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "50%" }}
          transition={{
            duration: 0.7,
            type: "spring",
          }}
          className="absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-pink-700 to-red-400"
        ></motion.span>
      </h1>
      <div className="mb-4 grid gap-4 sm:grid-cols-2 [&_input:valid]:border-pink-500 [&_input]:outline-none [&_textarea]:outline-none">
        <Editor setContent={setContent} data={content} className="col-span-2" />
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
