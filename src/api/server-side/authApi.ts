// import { LoginForm } from 'types';
import axiosServer from "@/lib/axiosServer"
import { TUser } from "@/types"

const authApi = {
  //   login: (body: LoginForm) => axiosClient.post('auth/login', body),
  getUser: (): Promise<TUser> => axiosServer.get("/user"),
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
}

export default authApi
