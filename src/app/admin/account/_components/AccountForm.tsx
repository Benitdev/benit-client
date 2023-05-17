import { ForwardedRef, forwardRef, useState } from "react"

import { IconEdit, IconPlus, IconX } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

import Button from "@/components/common/Button"
import categoryApi from "@/api/categoryApi"
import { TAction, TCategory } from "@/types"
import Select from "@/components/common/Select"
import { ROLE_OPTIONS, STATUS_OPTIONS } from "@/constants/options"
import courseApi from "@/api/courseApi"
import Image from "next/image"
import ImageSkeleton from "@/components/common/Skeleton/ImageSkeleton"
import accountApi from "@/api/accountApi"

const schema = yup
  .object({
    username: yup.string(),
    password: yup.string(),
    email: yup.string(),
    avatar: yup.string(),
    phoneNumber: yup.number(),
    fullName: yup.string().required("Họ và tên là bắt buộc!"),
    role: yup.string().required("Vai trò là bắt buộc"),
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
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: selectedRow,
  })
  const [imagePath, setImagePath] = useState<string>(
    action === TAction.Edit ? selectedRow.avatar : ""
  )
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn:
      action === TAction.Add
        ? accountApi.updateAccount
        : accountApi.updateAccount,
    onSuccess: (data) => {
      toggleForm()
      toast.success(data.message)
      reset()
      queryClient.invalidateQueries(["accounts"])
    },
    onError: (error) => {
      toast.error(error as string)
    },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    mutation.mutate({ ...data, avatar: imagePath, id: selectedRow._id })
  }

  const uploadMutation = useMutation({
    mutationFn: courseApi.uploadImage,
    onSuccess: (data) => {
      setImagePath(data.imagePath)
    },
    onError: (error: any) => {
      toast.error(error.data.message as string)
    },
  })

  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-1/2 min-h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-900 px-10 pb-10 pt-5 shadow-xl"
    >
      <h2 className="relative mb-5 border-b border-gray-200/20 py-3 text-xl font-bold text-slate-200">
        Thông tin tài khoản
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
          <div>
            <label
              htmlFor="title"
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Tên đăng nhập
            </label>
            <input
              {...register("username")}
              type="text"
              className="text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Điền tên đăng nhập"
              disabled
              required
            />
            <small className="font-bold capitalize text-pink-600">
              {errors.username?.message}
            </small>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Mật khẩu
            </label>
            <input
              {...register("password")}
              type="text"
              className="text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Mật khẩu"
              disabled
            />
            <small className="font-bold capitalize text-pink-600">
              {errors.password?.message}
            </small>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              className="text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Điền địa chỉ email"
              disabled
            />
            <small className="font-bold capitalize text-pink-600">
              {errors.email?.message}
            </small>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Số điện thoại
            </label>
            <input
              {...register("phoneNumber")}
              type="text"
              className="text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Điền số điện thoại"
            />
            <small className="font-bold capitalize text-pink-600">
              {errors.phoneNumber?.message}
            </small>
          </div>
          <div>
            <label
              htmlFor="fullName"
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Họ và tên
            </label>
            <input
              {...register("fullName")}
              type="text"
              className="text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
              placeholder="Điền họ và tên"
            />
            <small className="font-bold capitalize text-pink-600">
              {errors.fullName?.message}
            </small>
          </div>
          <div>
            <label
              htmlFor="role"
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Vai trò
            </label>
            <Select
              label="role"
              register={register}
              required
              options={ROLE_OPTIONS}
            />
            <small className="font-bold capitalize text-pink-600">
              {errors.role?.message}
            </small>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Ảnh đại diện
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
              className="text-sm mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Trạng thái
            </label>
            <Select
              label="status"
              register={register}
              required
              options={STATUS_OPTIONS}
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
          disabled={mutation.isLoading}
        >
          {action === TAction.Add ? (
            <>
              <IconPlus />
              <span>Thêm tài khoản</span>
            </>
          ) : (
            <>
              <IconEdit />
              <span>Sửa tài khoản</span>
            </>
          )}
        </Button>
      </form>
    </div>
  )
})

export default AccountForm
