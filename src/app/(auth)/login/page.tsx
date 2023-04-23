import Link from "next/link"

import Heading from "@/components/common/Heading"
import SmallLogo from "@/components/common/Logo/SmallLogo"
import Particles from "@/components/ui/Particles"
import LoginForm from "@/components/common/Form/LoginForm"

type Props = {}

const Login = (props: Props) => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <Particles />
      <div className="h-[600px] w-[640px] rounded-xl bg-slate-800 p-10 drop-shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <Link href={"/"}>
            <SmallLogo />
          </Link>
          <Heading>Chào mừng đến với Benit</Heading>
          <LoginForm />
          <div className="text-sm absolute bottom-0 px-10 pb-2 text-center text-slate-400">
            Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{" "}
            <a href="">Điều khoản sử dụng</a> của chúng tôi.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
