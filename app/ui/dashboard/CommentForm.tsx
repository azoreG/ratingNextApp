'use client';

import { addComment } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { useRef, useEffect } from 'react';
import StarRatingSelector from './StarRatingSelector';

export default function CommentForm({ place_id }: { place_id: string }) {
  const initialState = { message: null, errors: {} };
  const addCommentWithId = addComment.bind(null, place_id);
  const ref = useRef<HTMLFormElement>(null);

  const [state, dispatch] = useFormState(addCommentWithId, initialState);
  const starValue = 0;

  return (
    <form ref={ref} action={dispatch}>
      <StarRatingSelector value={starValue} />
      <textarea
        id="p_comment"
        name="p_comment"
        rows={5}
        cols={33}
        className="w-full rounded-md border border-[#474748] mb-4"
        aria-describedby="comment-error"
        defaultValue=""
      ></textarea>

      {state?.errors?.p_comment ? (
        <div
          id="comment-error"
          aria-live="polite"
          className="mb-5 text-sm text-red-500"
        >
          {state.errors.p_comment.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : null}

      <SubmitButton formRef={ref} errors={state?.errors} />
    </form>
  );
}

function SubmitButton({ formRef, errors }: any) {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!errors) {
      formRef?.current?.reset();
    }
  }, [pending, formRef, errors]);

  return (
    <button
      type="submit"
      className="w-full rounded-md bg-[#265183] hover:bg-blue-600 text-white py-2"
      aria-disabled={pending}
      disabled={pending}
    >
      Submit
    </button>
  );
}
