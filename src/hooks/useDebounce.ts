import { useEffect, useState } from 'react';
const useDebounce = (value: string, delay: number) => {
  const [text, setText] = useState<string>(value);

  useEffect(() => {
    setTimeout(() => {
      setText(value);
    }, delay);
  }, [value]);

  return text;
};

export default useDebounce;
