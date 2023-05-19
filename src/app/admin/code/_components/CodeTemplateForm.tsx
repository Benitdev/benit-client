import { ForwardedRef, forwardRef, useState } from "react"

import { IconEdit, IconPlus, IconX } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

import Button from "@/components/common/Button"
import categoryApi from "@/api/client-side/categoryApi"
import { TAction, TCategory } from "@/types"
import CodeEditorBlock from "@/components/ui/CodeBlock"
import CodeCard from "@/components/ui/CodeCard"
import CodePreview from "@/components/ui/CodePreview"
import Select from "@/components/common/Select"
import { useCategory } from "@/hooks/useCategory"
import codeTemplateApi from "@/api/client-side/codeTemplateApi"

const schema = yup
  .object({
    title: yup.string().required(),
    categoryID: yup.string().required(),
    description: yup.string().required(),
    authorId: yup.string(),
  })
  .required()

type Props = {
  toggleForm: () => void
  action: TAction
  selectedRow: any
}
type FormData = yup.InferType<typeof schema>

const CodeCateForm = forwardRef(function CourseForm(
  { toggleForm, action, selectedRow }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: selectedRow,
  })
  const [isCodingLayout, setIsCodingLayout] = useState<boolean>(false)
  const [codeValues, setCodeValues] = useState(
    !selectedRow.htmlCode
      ? {
          htmlCode: "",
          cssCode: "",
          jsCode: "",
        }
      : {
          htmlCode: selectedRow.htmlCode,
          cssCode: selectedRow.cssCode,
          jsCode: selectedRow.jsCode,
        }
  )

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn:
      action === TAction.Add
        ? codeTemplateApi.addTemplate
        : codeTemplateApi.updateTemplate,
    onSuccess: (data) => {
      toggleForm()
      toast.success(data.message)
      reset()
      queryClient.invalidateQueries(["code-template"])
    },
    onError: (error: any) => {
      toast.error(error.data.message as string)
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate({ ...data, ...codeValues, status: "approved" })
  }

  const { data: categories } = useCategory("code-categories", "code")

  return isCodingLayout ? (
    <motion.div
      layoutId="codingLayout"
      className="relative h-4/5 w-full bg-slate-900"
      // transition={{ duration: 2 }}
    >
      <IconX
        className="hover:text-primary absolute right-4 top-4 z-10 h-8 w-8 cursor-pointer text-gray-300"
        onClick={() => {
          setIsCodingLayout(false)
        }}
      />
      <div className="flex h-1/2 p-2">
        <CodeEditorBlock
          name="htmlCode"
          setValue={setCodeValues}
          code={codeValues.htmlCode ?? ""}
          language="html"
          height="100%"
          placeholder="Enter your html code"
          showTitle
        />
        <CodeEditorBlock
          setValue={setCodeValues}
          code={codeValues.cssCode ?? ""}
          language="css"
          name="cssCode"
          height="100%"
          placeholder="Enter your css code"
          showTitle
        />
        <CodeEditorBlock
          name="jsCode"
          setValue={setCodeValues}
          code={codeValues.jsCode ?? ""}
          language="javascript"
          height="100%"
          placeholder="Enter your javascript code"
          showTitle
        />
      </div>
      <div className="h-1/2">
        <CodePreview
          htmlCode={codeValues.htmlCode}
          cssCode={codeValues.cssCode}
          jsCode={codeValues.jsCode}
        />
      </div>
    </motion.div>
  ) : (
    <motion.div
      ref={ref}
      layoutId="codingLayout"
      className="absolute left-1/2 top-[50%] min-h-[500px] w-[90%] max-w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-900 px-10 pb-10 pt-5 shadow-xl"
    >
      <h2 className="relative mb-5 border-b border-gray-200/20 py-3 text-xl font-bold text-slate-200">
        Code Template
        <button
          className="absolute -right-8 top-0 -translate-y-1/2 hover:text-red-500"
          onClick={toggleForm}
        >
          <IconX />
        </button>
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="scrollbar-style relative grid max-h-[700px] w-full grid-cols-1 items-start overflow-auto px-1 lg:grid-cols-5 "
      >
        <div className="col-span-3 pr-4 pt-8">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 [&_input:valid]:border-pink-500 [&_input]:outline-none [&_textarea]:outline-none">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                {...register("title")}
                type="text"
                id="title"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
                placeholder="Type product name"
                required
              />
              <small className="font-bold capitalize text-pink-600">
                {errors.title?.message}
              </small>
            </div>
            <div>
              <label
                htmlFor="categoryID"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <Select
                label="categoryID"
                register={register}
                required
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
                placeholder="Enter your html code"
              ></CodeEditorBlock>
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
                placeholder="Enter your css code"
              ></CodeEditorBlock>
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
                placeholder="Enter your javascript code"
              ></CodeEditorBlock>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                {...register("description")}
                id="description"
                rows={3}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
                placeholder="Write code template description here"
              ></textarea>
              <small className="font-bold capitalize text-pink-600">
                {errors.title?.message}
              </small>
            </div>
          </div>
          <Button
            className="mx-auto mt-8 bg-pink-700"
            classStroke="stroke-pink-600"
            small
            type="submit"
            disabled={mutation.isLoading}
          >
            {action === TAction.Add ? (
              <>
                <IconPlus />
                <span className="leading-none">Thêm code template</span>
              </>
            ) : (
              <>
                <IconEdit />
                <span className="leading-none">Sửa code template</span>
              </>
            )}
          </Button>
        </div>
        <div className="pt-8 lg:sticky lg:top-0 lg:col-span-2">
          <CodeCard
            title={"ahihi"}
            htmlCode={codeValues.htmlCode}
            cssCode={codeValues.cssCode}
            jsCode={codeValues.jsCode}
            author={"ahaihiai"}
            preview
          />
        </div>
      </form>
    </motion.div>
  )
})

export default CodeCateForm
