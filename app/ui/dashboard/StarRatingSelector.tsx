'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';

const StarRating = ({ value = 0, id }: { value: number; id?: string }) => {
  const initialRate = Math.round(value);
  const [rate, setRate] = useState(initialRate);

  return (
    <div className="flex mb-2">
      {[...Array(5)].map((v, index) => {
        const isDisabled = index >= rate;
        return (
          <div key={`${id}-${index}`}>
            <StarIcon
              onClick={() => {
                setRate(index + 1);
              }}
              className={clsx('h-5 w-5 text-yellow-500', {
                '!text-gray-500': isDisabled,
              })}
            />
          </div>
        );
      })}
      <input name="rate" type="text" value={rate} className="hidden" />
    </div>
  );
};

export default StarRating;
