// import { LoginForm } from 'types';
import axiosClient from "@/lib/axiosClient"
import { ResSuccess } from "@/types"

const authApi = {
  //   login: (body: LoginForm) => axiosClient.post('auth/login', body),
  loginSocial: (provider: string, code: string) =>
    axiosClient.get(`/auth/${provider}`, {
      params: {
        code,
      },
    }),
  getUser: () => axiosClient.get("/user"),
  //   register: (body: any) => axiosClient.post('auth/register', body),
  //   logout: () => axiosClient.post('auth/logout'),
  //   verifyToken: (token: string) => {
  //     return axios.post(
  //       'http://localhost:8000/api/auth/verify-token',
  //       {},
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //   },
  updateProgress: (data: any): Promise<ResSuccess> =>
    axiosClient.post("/user/update-progress", data),
}

export default authApi
