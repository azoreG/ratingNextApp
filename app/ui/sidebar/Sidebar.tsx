import { fetchPlaces } from '@/app/lib/data';
import { Card } from './Card';
import { signOut } from '@/auth';

export default async function Sidebar() {
  const places = await fetchPlaces();
  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
      <h3 className="text-sm font-medium mb-4">
        Select the cards in order to evaluate them
      </h3>

      {places.map(({ id, p_name, image, rating }) => (
        <Card key={id} id={id} title={p_name} image={image} rate={rating} />
      ))}
    </div>
  );
}
