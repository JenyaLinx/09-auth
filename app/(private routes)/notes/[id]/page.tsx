import NotesClient from "./Notes.client";
import { fetchNoteById } from "@/lib/api/serverApi";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `/notes/${params.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <NotesClient id={params.id} />;
}