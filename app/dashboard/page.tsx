import Image from 'next/image';
import Comments from '../ui/dashboard/Comments';
import { Suspense } from 'react';
import StarRating from '../ui/dashboard/StarRating';
import { fetchPlace } from '../lib/data';
import CommentForm from '../ui/dashboard/CommentForm';
import Sidebar from '../ui/sidebar/Sidebar';
import styles from './dashboard.module.css';

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
    <div
      className={`flex  flex-col md:flex-row p-6 h-full ${styles.container}`}
    >
      <div className="w-full mr-6 p-4 flex-none md:w-[394px] bg-white shadow overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-grow md:overflow-y-auto bg-white shadow">
        <main className="p-12">
          {placeId ? (
            <div>
              <Image
                src={image}
                width={717}
                height={477}
                alt="Screenshot of the dashboard project showing mobile version"
                className="mx-auto mb-9"
              />
              <div>
                <div className="flex justify-between">
                  <h1 className="text-2xl">{p_name}</h1>
                  <StarRating value={rating} readOnly={true} id={placeId} />
                </div>

                <Suspense>
                  <Comments id={placeId} />
                </Suspense>

                <CommentForm place_id={placeId} />
              </div>
            </div>
          ) : (
            <h1>Select a place</h1>
          )}
        </main>
      </div>
    </div>
  );
}
