'use client';

import css from './page.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function EditProfilePage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [username, setUsername] = useState(user?.username || '');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const updated = await updateMe({ username });

    if (updated) {
      setUser(updated);
      router.push('/profile');
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

      <Image
  src={user?.avatar || 'https://ac.goit.global/fullstack/react/avatar-1.jpg'}
  alt="User Avatar"
  width={120}
  height={120}
  className={css.avatar}
/>

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}