'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { signIn } from '@/auth';
const bcrypt = require('bcrypt');
import { redirect } from 'next/navigation';

const CommentSchema = z.object({
  id: z.string(),
  place_id: z.string().uuid(),
  user_id: z.string().uuid(),
  rate: z.coerce.number(),
  p_comment: z.string().min(10, {
    message: 'Must be 10 or more characters long',
  }),
});

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const AddComment = CommentSchema.omit({
  id: true,
  user_id: true,
  place_id: true,
});

const AddUser = UserSchema.omit({
  id: true,
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
  } catch (error) {
    return { message: 'Database Error: Failed to Create a comment.' };
  }

  revalidatePath('/dashboard');
  return { message: 'Success' };
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}

export async function signUp(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = AddUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return 'CredentialSignin';
  }

  const { name, email, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
    INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
    `;
  } catch (error) {
    console.log('error', error);
    return 'CredentialSignin';
  }

  redirect('/login');
}
