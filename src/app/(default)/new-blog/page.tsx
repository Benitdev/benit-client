import Editor from '@/components/layouts/Editor';
import dynamic from 'next/dynamic';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex-1">
      <Editor />
    </div>
  );
};

export default page;
