import { StarIcon } from '@heroicons/react/24/solid';

export function RatingCard({ value }: { value: number }) {
  return (
    <div className="bg-[#E1EFF2] rounded-full flex w-[50px] h-6 px-3 py-1 text-xs">
      <p className="mr-1">3</p>
      <StarIcon className="h-3.5 w-3.5 text-yellow-500" />
    </div>
  );
}
