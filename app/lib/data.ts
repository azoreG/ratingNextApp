import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchPlaces() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    const data =
      await sql<any>`SELECT places.id,places.p_name, places.image,AVG(p_comments.rate) as rating
      FROM places
      LEFT JOIN p_comments ON places.id = p_comments.place_id
      GROUP BY places.id`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch places data.');
  }
}

export async function fetchPlace(id?: string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  if (!id) return;
  try {
    const data =
      await sql<any>`SELECT places.id,places.p_name, places.image,AVG(p_comments.rate) as rating
      FROM places
      LEFT JOIN p_comments ON places.id = p_comments.place_id
      WHERE places.id=${id}
      GROUP BY places.id`;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch places data.');
  }
}

export async function fetchComments(id?: string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  if (!id) return;
  try {
    const data = await sql<any>`SELECT p_comments.id,p_comments.p_comment
      FROM p_comments
      JOIN places ON p_comments.place_id = places.id
	  WHERE places.id = ${id}`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comments data.');
  }
}
