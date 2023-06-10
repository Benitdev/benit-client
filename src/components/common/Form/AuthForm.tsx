"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { setCookie } from "cookies-next"
import authApi from "@/api/client-side/authApi"

const AuthForm = ({ error }: any) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [emailErr, setEmailErr] = useState("")
  const [passErr, setPassErr] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true)
      let res: any = await authApi.login(data)
      // localStorage.setItem('ACCESS_TOKEN', res.authorization.token);
      setCookie("ACCESS_TOKEN", res.access_token)
      toast.success("Đăng nhập thành công")
      setIsLoading(false)
      router.push("/")
    } catch (e: any) {
      if (e.message === "Email does not exist") {
        setEmailErr("Email không tồn tại!")
        setTimeout(() => {
          setEmailErr("")
        }, 3000)
      } else if (e.message === "The user credentials were incorrect.") {
        setPassErr("The user credentials were incorrect.")
        setTimeout(() => {
          setPassErr("")
        }, 3000)
      }
      setIsLoading(false)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center gap-4 py-6"
    >
      <div className="w-4/5 space-y-7">
        <div className="w-full">
          <div className="relative flex justify-between text-primary">
            <input
              {...register("email", {
                required: true,
                maxLength: 40,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              className={`peer w-full border-b-2 border-b-gray-400 bg-transparent p-2 text-sm font-bold  placeholder-transparent autofill:!bg-yellow-200  focus:border-b-primary focus:outline-none`}
              placeholder="Email or Phone"
              autoComplete="off"
            />
            <label
              htmlFor="email"
              className="pointer-events-none absolute -top-3.5 left-0 text-sm font-bold transition-all peer-placeholder-shown:left-[11px]
                        peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400"
            >
              Email or Phone
            </label>
          </div>
          {errors.email?.type === "required" && (
            <small className="text-red-600"> Tên đăng nhập là bắt buộc!</small>
          )}
          {errors.email?.type === "pattern" && (
            <small className="text-red-600"> Email không hợp lệ!</small>
          )}
          {emailErr && <small className="text-red-600"> {emailErr} </small>}
        </div>
        <div className="w-full">
          <div className="relative flex justify-between text-primary">
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 40,
              })}
              className={`peer w-full border-b-2 border-b-gray-400 bg-transparent p-2 text-xl placeholder-transparent focus:border-b-primary focus:outline-none`}
              placeholder="Password"
              type="password"
            />
            <label
              htmlFor="password"
              className="pointer-events-none absolute -top-3 left-0 text-sm font-bold transition-all peer-placeholder-shown:left-[11px]
                        peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400"
            >
              Password
            </label>
          </div>
          {errors.password?.type === "required" && (
            <small className="text-red-600"> Mật khẩu là bắt buộc!</small>
          )}
          {errors.password?.type === "minLength" && (
            <small className="text-red-600"> Mật khẩu quá ngắn!</small>
          )}
          {errors.password?.type === "maxLength" && (
            <small className="text-red-600"> Mật khẩu quá dài!</small>
          )}
          {passErr && <small className="text-red-600"> {passErr} </small>}
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="button-effect bg-gradient-primary mt-4 h-14 w-[300px] rounded-xl font-bold text-slate-200 "
      >
        {" "}
        Đăng Nhập{" "}
      </button>
      <div className="flex w-[300px] justify-between text-xs">
        <div className="flex gap-1 text-center ">
          <input type="checkbox" />
          <label htmlFor="">Nhớ mật khẩu</label>
        </div>
        <span className="text-red-600 underline">Quên mật khẩu?</span>
      </div>
      {error && (
        <small className="font-bold italic text-red-500">
          {" "}
          Email này đã được trong một tài khoản khác!
        </small>
      )}
    </form>
  )
}

export default AuthForm
