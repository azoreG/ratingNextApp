'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

const CommentSchema = z.object({
  id: z.string(),
  place_id: z.string().uuid(),
  user_id: z.string().uuid(),
  rate: z.coerce.number(),
  p_comment: z.string().min(10, {
    message: 'Must be 10 or more characters long',
  }),
});

const AddComment = CommentSchema.omit({
  id: true,
  user_id: true,
  place_id: true,
});

export type State = {
  errors?: {
    p_comment?: string[];
    rate?: string[];
  };
  message?: string | null;
};

export async function addComment(
  place_id: string,
  prevState: State,
  formData: FormData
) {
  // Validate form using Zod
  const validatedFields = AddComment.safeParse({
    p_comment: formData.get('p_comment'),
    rate: formData.get('rate'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log('error');
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create a comment.',
    };
  }

  const { p_comment, rate } = validatedFields.data;

  try {
    await sql`
    INSERT INTO p_comments (place_id, user_id, p_comment, rate)
    VALUES (${place_id}, '410544b2-4001-4271-9855-fec4b6a6442a', ${p_comment}, ${rate})
    `;
    return { message: 'Success' };
  } catch (error) {
    console.log('error', error);
    return { message: 'Database Error: Failed to Create a comment.' };
  }

  revalidatePath('/');
}
