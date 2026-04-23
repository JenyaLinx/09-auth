'use client';

import { useEffect, useState } from 'react';
import { fetchNoteById } from '@/lib/api/clientApi';

type Note = {
  _id: string;
  title: string;
  content: string;
  tag: string;
};

type Props = {
  id: string;
};

export default function NotesClient({ id }: Props) {
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data = await fetchNoteById(id);
        setNote(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadNote();
  }, [id]);

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <span>{note.tag}</span>
    </div>
  );
}