import { Dispatch, SetStateAction } from "react"

import { set, useForm } from "react-hook-form"
import { IconFilter } from "@tabler/icons-react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import Button from "@/components/common/Button"
import Select from "@/components/common/Select"
import { FEATURE_OPTIONS, POST_STATUS_OPTIONS } from "@/constants/options"
import { useCategory } from "@/hooks"
import { TFilter } from "@/types"

type Props = {
  page: "account" | "blog" | "code" | "course"
  value: TFilter
  setValue: Dispatch<SetStateAction<TFilter>>
  isLoading: boolean
  hasFeature?: boolean
}

const schema = yup.object({
  title: yup.string(),
  categoryId: yup.string(),
  feature: yup.string(),
  status: yup.string(),
})

type FormData = yup.InferType<typeof schema>

export default function Filter({
  page,
  value,
  setValue,
  isLoading,
  hasFeature,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: value,
  })

  const { data: categories } = useCategory("code-categories", page)

  const onSubmit = (data: FormData) => {
    setValue({ ...data })
    reset({}, { keepValues: true })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-4 flex  flex-wrap gap-2"
    >
      <div>
        <input
          {...register("title")}
          type="text"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
          placeholder="Điền tiêu đề bài viết"
        />
      </div>
      <div>
        <Select
          label="categoryId"
          register={register}
          required
          options={categories?.map((category) => ({
            value: category._id,
            label: category.title,
          }))}
        />
      </div>
      <div>
        <Select
          label="status"
          register={register}
          required
          options={POST_STATUS_OPTIONS}
        />
      </div>
      {hasFeature && (
        <div>
          <Select
            label="feature"
            register={register}
            required
            options={FEATURE_OPTIONS}
          />
        </div>
      )}
      <Button
        className="ml-2 bg-pink-700"
        classStroke="stroke-pink-600"
        small
        type="submit"
        disabled={isLoading || !isDirty}
      >
        <IconFilter />
        <span className="leading-none">Lọc</span>
      </Button>
    </form>
  )
}
