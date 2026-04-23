'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';

type Props = {
  id: string;
};

export default function NotesClient({ id }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong.</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <span>{data.tag}</span>
    </div>
  );
}