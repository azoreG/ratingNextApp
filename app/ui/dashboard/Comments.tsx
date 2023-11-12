import Comment from './Comment';

export default async function Comments({
  data,
}: {
  data: { id: number; text: string }[];
}) {
  return data.map((comment) => {
    const { id, text } = comment;
    return <Comment key={id} comment={text} />;
  });
}
