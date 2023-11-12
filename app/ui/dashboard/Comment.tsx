export default async function Comment({ comment }: { comment: string }) {
  return <p className="py-6">{comment}</p>;
}
