import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { isAxiosError } from 'axios';

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Unknown error' },
      { status: 500 }
    );
  }
}