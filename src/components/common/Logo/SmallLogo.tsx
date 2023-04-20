import Image from 'next/image';

type Props = {};

const SmallLogo = (props: Props) => {
  return (
    <div className="relative h-[45px] w-[90px] overflow-hidden rounded-xl bg-pink-700 shadow-md shadow-pink-700/30">
      <Image
        src={'/images/logo_dark.png'}
        alt=""
        fill
        className="pointer-events-none scale-[2.5]"
      />
    </div>
  );
};

export default SmallLogo;
