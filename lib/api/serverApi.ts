import { cookies } from 'next/headers';
import { api } from './api';
import { User } from '@/types/user';



export const checkSession = async (): Promise<boolean> => {
  const cookieStore = await cookies();

  try {
    const res = await api.get('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.status === 200;
  } catch {
    return false;
  }
};



export const getMe = async (): Promise<User | null> => {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get<User>('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return data;
  } catch {
    return null;
  }
};



export const fetchNotes = async (params?: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}) => {
  const cookieStore = await cookies();

  const { data } = await api.get('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const { data } = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};