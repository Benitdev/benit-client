import Image from "next/image"
import { ForwardedRef, forwardRef, useState } from "react"

import { IconEdit, IconMinus, IconPlus, IconX } from "@tabler/icons-react"
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import * as yup from "yup"
import { ErrorMessage } from "@hookform/error-message"

import Button from "@/components/common/Button"
import { TAction } from "@/types"
import { useCategory } from "@/hooks"
import Select from "@/components/common/Select"
import { COURSE_TYPE, LEVEL_OPTIONS } from "@/constants/options"
import LessonForm from "./LessonForm"
import courseApi from "@/api/client-side/courseApi"
import ImageSkeleton from "@/components/common/Skeleton/ImageSkeleton"

const schema = yup
  .object({
    title: yup.string().required("Tên khóa học là bắt buộc!"),
    categoryId: yup.string().required("Danh mục khoá học là bắt buộc!"),
    type: yup.string().required("Loại khoá học là bắt buộc!"),
    goals: yup.array().of(yup.string().required()),
    courseChapters: yup.array().of(
      yup.object({
        index: yup.string().required(),
        title: yup.string().required("Tiêu đề chương là bắt buộc!"),
        description: yup.string(),
        lessons: yup.array().of(
          yup.object({
            title: yup.string().required("Tiêu đề bài học là bắt buộc!"),
            videoID: yup.string().required(),
            duration: yup.string(),
          })
        ),
      })
    ),
    level: yup.string().required("Trình độ khóa học là bắt buộc!"),
    description: yup.string().required("Mô tả khoá học là bắt buộc!"),
    image: yup.string().required("Ảnh bìa là bắt buộc!"),
  })
  .required()

type Props = {
  toggleForm: () => void
  action: TAction
  selectedRow: any | {}
}
type FormData = yup.InferType<typeof schema>

const CourseForm = forwardRef(function CourseForm(
  { action, selectedRow, toggleForm }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [openLessonModal, setOpenLessonModal] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues:
      action === TAction.Edit
        ? { ...selectedRow, categoryId: selectedRow.categoryId._id }
        : {},
  })

  const {
    fields: goalsFields,
    append: appendGoal,
    remove: removeGoal,
  } = useFieldArray({
    control,
    name: "goals" as never,
  })

  const imagePath = watch("image")
  const courseChapters = watch("courseChapters")

  const {
    fields: chaptersFields,
    append: appendChapter,
    remove: removeChapter,
  } = useFieldArray({
    control,
    name: "courseChapters",
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn:
      action === TAction.Add ? courseApi.addCourse : courseApi.updateCourse,
    onSuccess: (data) => {
      toggleForm()
      toast.success(data.message)
      reset()
      queryClient.invalidateQueries(["courses"])
    },
    onError: (error: any) => {
      toast.error(error.data.message as string)
    },
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  const { data: categories } = useCategory("code-categories", "course")

  const uploadMutation = useMutation({
    mutationFn: courseApi.uploadImage,
    onSuccess: (data) => {
      setValue("image", data.imagePath, { shouldDirty: true })
    },
    onError: (error: any) => {
      toast.error("Tải ảnh không thành công!")
    },
  })

  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-1/2 min-h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-900 px-10 pb-10 pt-5 shadow-xl"
    >
      <h2 className="relative mb-5 border-b border-gray-200/20 py-3 text-xl font-bold text-slate-200">
        {action === TAction.Add ? "Thêm" : "Sửa"} khoá học
        <button
          className="absolute -right-8 top-0 -translate-y-1/2 hover:text-red-500"
          onClick={toggleForm}
        >
          <IconX />
        </button>
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="scrollbar-style max-h-[700px] overflow-y-auto pr-1"
      >
        <div className="mb-4 grid gap-4 sm:grid-cols-2 [&_input:valid]:border-pink-500 [&_input]:outline-none [&_textarea]:outline-none">
          <div className="col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Tên khoá học
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Điền tên khoá học"
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
          <div>
            <label
              htmlFor="type"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Loại
            </label>
            <Select label="type" register={register} options={COURSE_TYPE} />
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
            <ErrorMessage
              errors={errors}
              name="categoryId"
              render={({ message }) => (
                <small className="font-bold capitalize text-pink-600">
                  {message}
                </small>
              )}
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Mục tiêu khoá học
            </label>
            <div className="space-y-2">
              {goalsFields.map((field, index) => (
                <div key={field.id} className="relative">
                  <input
                    {...register(`goals.${index}`)}
                    type="text"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
                    placeholder="Đạt được gì sau khoá học?"
                  />
                  <small className="font-bold text-pink-600">
                    {errors.goals?.message}
                  </small>
                  <button
                    onClick={() => removeGoal(index)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-pink-700 p-1"
                    type="button"
                  >
                    <IconMinus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => appendGoal("")}
              className="mx-auto mt-2 block rounded-full bg-pink-700 p-1"
              type="button"
            >
              <IconPlus />
            </button>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Danh sách chương
            </label>
            <div className="space-y-2">
              {chaptersFields.map((field, index) => (
                <div key={field.id} className="space-y-1">
                  <div className="relative mb-2 block text-xs font-medium text-gray-900 dark:text-slate-400">
                    <span>Chương {index + 1}</span>
                    <button
                      className="ml-4"
                      onClick={() => setOpenLessonModal(index)}
                      type="button"
                    >
                      Xem danh sách bài học
                    </button>
                    {openLessonModal === index && (
                      <LessonForm
                        control={control}
                        index={index}
                        setValue={setValue}
                        chapter={`Chương ${index + 1}: ${
                          courseChapters?.[index].title
                        }`}
                        register={register}
                        errors={errors}
                        setOpenLessonModal={setOpenLessonModal}
                      />
                    )}
                    <button
                      onClick={() => removeChapter(index)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-pink-700 p-1 text-slate-900"
                      type="button"
                    >
                      <IconMinus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      {...register(`courseChapters.${index}.index`)}
                      value={index + 1}
                      hidden
                    />
                    <input
                      {...register(`courseChapters.${index}.title`)}
                      type="text"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
                      placeholder="Tiêu đề chương"
                    />
                    <small className="font-bold text-pink-600">
                      {errors.courseChapters?.message}
                    </small>
                  </div>
                  <div className="relative">
                    <textarea
                      {...register(`courseChapters.${index}.description`)}
                      rows={3}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
                      placeholder="Write code template description here"
                    ></textarea>
                    <small className="font-bold text-pink-600">
                      {errors.courseChapters?.message}
                    </small>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                appendChapter({
                  index: `${chaptersFields.length + 1}`,
                  title: "",
                  description: "",
                })
              }
              className="mx-auto mt-2 block rounded-full bg-pink-700 p-1"
              type="button"
            >
              <IconPlus />
            </button>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Mô tả khoá học
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
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Ảnh bìa khoá học
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
        </div>
        <div>
          <label
            htmlFor="level"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Trình độ
          </label>
          <Select
            label="level"
            register={register}
            required
            options={LEVEL_OPTIONS?.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
          />
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
              <span className="leading-none">Thêm khoá học</span>
            </>
          ) : (
            <>
              <IconEdit />
              <span className="leading-none">Sửa khoá học</span>
            </>
          )}
        </Button>
      </form>
    </div>
  )
})

export default CourseForm
