import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

type Cookie = {
  id?: number;
};

export const getSession = async () => {
  return await getIronSession<Cookie>(cookies(), {
    cookieName: 'user',
    password: process.env.COOKIE_PASSWORD!,
  });
};

export const saveIdToSession = async (id: number) => {
  const session = await getSession();
  session.id = id;

  await session.save();
};
