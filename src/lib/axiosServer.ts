import axios from 'axios';
import { cookies } from 'next/headers';

const baseUrl = 'http://localhost:5000/api/v1';
const getToken = () => cookies().get('x-auth-cookies')?.value;
const axiosServer = axios.create({
  baseURL: baseUrl,
});

axiosServer.interceptors.request.use((config: any) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosServer.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  },
);

export default axiosServer;
