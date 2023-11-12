import { fetchPlaces } from '@/app/lib/data';
import { Card } from './Card';

export default async function Sidebar() {
  const places = await fetchPlaces();
  return (
    <div>
      <h3 className="text-sm font-medium mb-4">
        Select the cards in order to evaluate them
      </h3>

      {places.map(({ id, p_name, image, rating }) => (
        <Card key={id} id={id} title={p_name} image={image} rate={rating} />
      ))}
    </div>
  );
}
