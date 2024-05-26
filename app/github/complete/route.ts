import db from '@/libs/db';
import { saveIdToSession } from '@/libs/session';
import { notFound, redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return notFound();
  }

  const accessTokenURL = 'https://github.com/login/oauth/access_token';
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
    redirect_url: '',
  }).toString();

  const finalURL = `${accessTokenURL}?${accessTokenParams}`;

  const { error, access_token: accessToken } = await fetch(finalURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  }).then((res) => res.json());

  if (error) {
    return new Response(null, { status: 400 });
  }

  console.log(accessToken);

  const { id, avatar_url, login } = await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-cache',
  }).then((res) => res.json());

  const user = await db.user.findUnique({
    where: {
      github_id: String(id),
    },
    select: {
      id: true,
    },
  });

  if (user) {
    await saveIdToSession(user.id);

    return redirect('/profile');
  }

  const newUser = await db.user.create({
    data: {
      username: `${login}-github`,
      github_id: String(id),
      avatar: avatar_url,
    },
  });

  await saveIdToSession(newUser.id);

  return redirect('/profile');
}
