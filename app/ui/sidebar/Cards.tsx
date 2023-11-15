import { fetchPlaces } from '@/app/lib/data';
import { Card } from './Card';

export default async function Cards() {
  const places = await fetchPlaces();

  return (
    <>
      {places.map(({ id, p_name, image, rating }) => (
        <Card key={id} id={id} title={p_name} image={image} rate={rating} />
      ))}
    </>
  );
}
