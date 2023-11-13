import { StarIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

const StarRating = ({
  value = 0,
}: {
  value: number;
  readOnly?: boolean;
  id?: string;
}) => {
  const initialRate = Math.round(value);
  return (
    <div className="flex mb-2">
      {[...Array(5)].map((v, index) => {
        const isDisabled = index >= initialRate;
        return (
          <div key={index}>
            <StarIcon
              className={clsx('h-10 w-10 text-yellow-500', {
                '!text-gray-500': isDisabled,
              })}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
