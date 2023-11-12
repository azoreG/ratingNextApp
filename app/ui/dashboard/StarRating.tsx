import { StarIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export default async function StarRating({ value }: { value: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((v, index) => {
        const isDisabled = index >= value;
        console.log(index, value);
        return (
          <StarIcon
            key={index}
            className={clsx('h-10 w-10 text-yellow-500', {
              '!text-gray-500': isDisabled,
            })}
          />
        );
      })}
    </div>
  );
}
