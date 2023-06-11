"use client"

import codeTemplateApi from "@/api/client-side/codeTemplateApi"
import Button from "@/components/common/Button"
import Select from "@/components/common/Select"
import CodeEditorBlock from "@/components/ui/CodeBlock"
import CodeCard from "@/components/ui/CodeCard"
import { useCategory } from "@/hooks"
import { TUser } from "@/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { IconPlus } from "@tabler/icons-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as yup from "yup"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

type Props = {
  user: TUser
}

const schema = yup
  .object({
    title: yup.string().required("Tiêu đề là bắt buộc"),
    categoryId: yup.string().required(),
    description: yup.string(),
    status: yup.string(),
  })
  .required()

type FormData = yup.InferType<typeof schema>

export default function NewCodePage({ user }: Props) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { status: "pending" },
  })

  const title = watch("title")
  const { data: categories } = useCategory("code-categories", "code")

  const [codeValues, setCodeValues] = useState({
    htmlCode: "",
    cssCode: "",
    jsCode: "",
  })

  const mutation = useMutation({
    mutationFn: codeTemplateApi.addTemplate,
    onSuccess: (data) => {
      toast.success(data.message)
      reset()
      setCodeValues({ htmlCode: "", cssCode: "", jsCode: "" })
      router.push("/my-code")
    },
    onError: (error: any) => {
      toast.error(error.data.message as string)
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate({ ...data, ...codeValues })
  }

  return (
    <div className="rounded-xl px-10 pb-10 pt-5 ">
      <h1 className="relative bg-gradient-to-b from-pink-700 to-red-400 bg-clip-text pb-4 text-2xl font-bold text-transparent">
        {"<Tạo Code Template />"}
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative grid w-full grid-cols-1 items-start px-1 lg:grid-cols-5"
      >
        <div className="col-span-3 pr-4 pt-8">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 [&_input:valid]:border-pink-500 [&_input]:outline-none [&_textarea]:outline-none">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên
              </label>
              <input
                {...register("title")}
                type="text"
                id="title"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
                placeholder="Điền tên đoạn code"
              />
              <small className="font-bold capitalize text-pink-600">
                {errors.title?.message}
              </small>
            </div>
            <div>
              <label
                htmlFor="categoryId"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Danh mục
              </label>
              <Select
                label="categoryId"
                register={register}
                options={categories?.map((category) => ({
                  value: category._id,
                  label: category.title,
                }))}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="htmlCode"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                HTML
              </label>
              <CodeEditorBlock
                name="htmlCode"
                setValue={setCodeValues}
                code={codeValues.htmlCode ?? ""}
                language="html"
                placeholder="Gõ code html ở đây nhen"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="cssCode"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                CSS
              </label>
              <CodeEditorBlock
                name="cssCode"
                setValue={setCodeValues}
                code={codeValues.cssCode ?? ""}
                language="css"
                placeholder="Gõ code css ở đây nhen"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="jsCode"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Javascript
              </label>
              <CodeEditorBlock
                name="jsCode"
                setValue={setCodeValues}
                code={codeValues.jsCode ?? ""}
                language="javascript"
                placeholder="Gõ code javascript ở đây nhen"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Mô tả đoạn code
              </label>
              <textarea
                {...register("description")}
                id="description"
                rows={3}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
                placeholder="Điền mô tả, công dụng"
              ></textarea>
              <small className="font-bold capitalize text-pink-600">
                {errors.description?.message}
              </small>
            </div>
          </div>

          <Button
            className="sticky bottom-2 mx-auto mt-8 bg-pink-700"
            classStroke="stroke-pink-600"
            small
            type="submit"
            disabled={mutation.isLoading}
          >
            <IconPlus />
            <span className="leading-none">Thêm code template</span>
          </Button>
        </div>
        <div className="pt-8 lg:sticky lg:top-14 lg:col-span-2">
          <CodeCard
            title={title}
            htmlCode={codeValues.htmlCode}
            cssCode={codeValues.cssCode}
            jsCode={codeValues.jsCode}
            author={user.fullName}
            className="bg-black/50 backdrop-blur-sm"
            preview
          />
        </div>
      </form>
    </div>
  )
}
