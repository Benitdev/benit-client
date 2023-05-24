// import { LoginForm } from 'types';
import httpRequest from "@/lib/httpRequest"
import { ResSuccess, TUser } from "@/types"

const authApi = {
  //   login: (body: LoginForm) => axiosClient.post('auth/login', body),
  getUser: (): Promise<TUser> => httpRequest("/user", { isCredential: true }),
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
  registerCourse: (data: {
    course: string
    lesson: string
  }): Promise<ResSuccess> =>
    httpRequest("/user/register-course", {
      method: "POST",
      isCredential: true,
      body: JSON.stringify(data),
    }),
}

export default authApi
