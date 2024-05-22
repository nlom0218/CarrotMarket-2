import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

type Cookie = {
  id?: number;
};

export default async function getSession() {
  return await getIronSession<Cookie>(cookies(), {
    cookieName: 'user',
    password: process.env.COOKIE_PASSWORD!,
  });
}
