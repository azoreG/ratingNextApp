import Image from 'next/image';
import Comments from '../ui/dashboard/Comments';
import { Suspense } from 'react';
import StarRating from '../ui/dashboard/StarRating';
import { fetchPlace } from '../lib/data';
import CommentForm from '../ui/dashboard/CommentForm';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  const id = searchParams?.id;
  const { id: placeId, p_name, image, rating } = (await fetchPlace(id)) || {};

  return (
    <main className="p-12">
      <Image
        src={image}
        width={717}
        height={477}
        alt="Screenshot of the dashboard project showing mobile version"
        className="mx-auto mb-9"
      />
      <div>
        <div className="flex justify-between">
          <h1>{p_name}</h1>
          <StarRating value={rating} readOnly={true} id={placeId} />
        </div>

        <Suspense>
          <Comments id={placeId} />
        </Suspense>

        <CommentForm place_id={placeId} />
      </div>
    </main>
  );
}
