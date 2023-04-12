'use client';
import { useState } from 'react';
import { useDebounce } from '@/hooks';

import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';

type Props = {};

const Searchbar = (props: Props) => {
  const [typingText, setTypingText] = useState<string>('');
  const searchText = useDebounce(typingText, 500);
  return (
    <div className="flex max-w-[550px] items-center rounded-full bg-slate-700 px-3 text-slate-200">
      <MagnifyingGlassIcon className="h-6 w-6" />
      <input
        type="text"
        className="h-[38px] w-full bg-transparent px-2 text-slate-200 focus:outline-none"
        placeholder="Tìm kiếm khoá học, bài viết, video, ..."
        value={typingText}
        onChange={(e) => setTypingText(e.target.value)}
      />
      <XCircleIcon className="h-6 w-6" />
    </div>
  );
};

export default Searchbar;
