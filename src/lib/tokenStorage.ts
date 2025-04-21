'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const setToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60*60*24*30
  });
};

export const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  return token ? token.value : null;
};

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/sign-in');
};
