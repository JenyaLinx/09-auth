import { api } from './api';
import { User } from '@/types/user';

// -------- TYPES --------

type RegisterRequest = {
  email: string;
  password: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

// -------- AUTH --------

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  const res = await api.get<{ success: boolean }>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const res = await api.get<User>('/auth/me');
  return res.data;
};

export const updateMe = async (data: { username: string }) => {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
};

// -------- NOTES --------

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
) => {
  const res = await api.get('/notes', {
    params: { page, search, tag, perPage: 12 },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}) => {
  const res = await api.post('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};