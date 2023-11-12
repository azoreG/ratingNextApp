'use client';

import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { RatingCard } from './RatingCard';
import clsx from 'clsx';

export function Card({
  id,
  title,
  rate,
  image,
}: {
  id: string;
  title: string;
  rate: number;
  image: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const selected = params.get('id') === id;

  const onClickHandler = () => {
    params.set('id', id);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={clsx(
        'bg-[#EBF4F7] rounded-md shadow-md overflow-hidden mb-6',
        {
          'outline outline-offset-2 outline-[#5D96AA]': selected,
        }
      )}
      onClick={onClickHandler}
    >
      <div className="w-full h-32 relative">
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt="image of landscape"
        />
      </div>
      <div className="p-3 flex justify-between">
        <p className="text-sm">{title}</p>
        <RatingCard value={rate} />
      </div>
    </div>
  );
}
