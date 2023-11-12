import Image from 'next/image';
import { RatingCard } from './RatingCard';

export function Card({
  title,
  rate,
  image,
}: {
  title: string;
  rate: number;
  image: string;
}) {
  return (
    <div className="bg-[#EBF4F7] rounded-md shadow-md overflow-hidden">
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
