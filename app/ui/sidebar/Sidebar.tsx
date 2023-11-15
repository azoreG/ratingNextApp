import Cards from './Cards';
import { Suspense } from 'react';
import { CardsSkeleton } from '../skeleton/skeletons';

export default async function Sidebar() {
  return (
    <div>
      <h3 className="text-sm font-medium mb-4">
        Select the cards in order to evaluate them
      </h3>

      <Suspense fallback={<CardsSkeleton />}>
        <Cards />
      </Suspense>
    </div>
  );
}
