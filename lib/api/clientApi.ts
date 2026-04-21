import { nextServer } from './api';
import { User } from '@/types/user';

// -------- AUTH --------

type RegisterRequest = {
  email: string;
  password: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async () => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async () => {
  const res = await nextServer.get<{ success: boolean }>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const res = await nextServer.get<User>('/auth/me');
  return res.data;
};

export const updateMe = async (data: { username: string }) => {
  const res = await nextServer.patch<User>('/users/me', data);
  return res.data;
};

// -------- NOTES --------

export const fetchNotes = async (page: number, search: string, tag?: string) => {
  const res = await nextServer.get('/notes', {
    params: { page, search, tag, perPage: 12 },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}) => {
  const res = await nextServer.post('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await nextServer.delete(`/notes/${id}`);
  return res.data;
};