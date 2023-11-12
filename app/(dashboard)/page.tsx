import Image from 'next/image';
import Comments from '../ui/dashboard/Comments';
import { Suspense } from 'react';
import StarRating from '../ui/dashboard/StarRating';

export default async function Page() {
  return (
    <main className="p-12">
      <Image
        src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_900,q_75,w_1700/v1/clients/quintanaroo/_cc911e74-049d-4172-b8d9-67b8942c9bc0.1392201394-2910bf3f5b8388c632d75b47bd71a0c94b1389b5c0b1926331aa7ed225a20103-d_640.jpg"
        width={717}
        height={477}
        alt="Screenshot of the dashboard project showing mobile version"
        className="mx-auto mb-9"
      />
      <div>
        <div className="flex justify-between">
          <h1>Beautiful View of Moraine Lake</h1>
          <StarRating value={5} />
        </div>

        <Suspense>
          <Comments
            data={[
              {
                id: 2,
                text: 'A landscape lake is a serene and picturesque body of water nestled amidst the beauty of the natural world. It is often characterized by its stunning visual appeal, with crystal-clear waters reflecting the surrounding landscape. The lake is typically framed by a variety of natural elements, creating a harmonious and tranquil scene.',
              },
            ]}
          />
        </Suspense>
      </div>
    </main>
  );
}
