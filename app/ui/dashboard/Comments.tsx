import { fetchComments } from '@/app/lib/data';
import Comment from './Comment';

export default async function Comments({ id }: { id: string }) {
  const data = (await fetchComments(id)) || [];

  return data.map((comment: { id: string; p_comment: string }) => {
    const { id, p_comment } = comment;
    return <Comment key={id} comment={p_comment} />;
  });
}
