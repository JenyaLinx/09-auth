'use client';

import css from './SignUpPage.module.css';
import { register } from '@/lib/api/clientApi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignUpPage() {
  const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData) as {
        email: string;
        password: string;
      };

      const res = await register(data);

      if (res) {
        setUser(res);
        router.push('/profile');
      }
    } catch (e: unknown) {
  if (e instanceof Error) {
    setError(e.message);
  } else {
    setError('Error');
  }
}
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}