'use client';

import { SocialIcon } from 'react-social-icons';
import ButtonAuth from '../button/ButtonAuth';
import { UserIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

type Props = {};

const providers = [
  {
    name: 'Google',
    url: 'http://localhost:5000/api/v1/auth/google',
  },
  {
    name: 'Facebook',
    url: 'http://localhost:5000/api/v1/auth/facebook',
  },
  {
    name: 'Github',
    url: 'http://localhost:5000/api/v1/auth/github',
  },
];

const LoginForm = (props: Props) => {
  const [activeAuthForm, setActiveAuthForm] = useState<boolean>(false);
  return !activeAuthForm ? (
    <div className="mt-8 space-y-4">
      <ButtonAuth
        className="w-[350px] !rounded-full border border-slate-300 py-2 text-center font-normal text-slate-200"
        onClick={() => setActiveAuthForm(true)}
      >
        <UserIcon className="h-10 w-10 rounded-full " />
        <p className="flex-1 items-center">Sử dụng Email/Số điện thoại</p>
      </ButtonAuth>
      {providers.map((item) => (
        <ButtonAuth
          key={item.url}
          className="w-[350px] !rounded-full border border-slate-300 py-2 text-center font-normal text-slate-200"
          url={item.url}
        >
          <SocialIcon
            url={`https://${item.name.toLocaleLowerCase()}.com`}
            className="pointer-events-none !h-10 !w-10"
            bgColor="rgb(226 232 240)"
          />
          <p className="flex-1 text-center">Tiếp tục với {item.name}</p>
        </ButtonAuth>
      ))}
    </div>
  ) : (
    <div>hello</div>
  );
};

export default LoginForm;
