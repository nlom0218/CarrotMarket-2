import { notFound } from 'next/navigation';
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

  const accessTokenResponse = await fetch(finalURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  }).then((res) => res.json());

  if ('error' in accessTokenResponse) {
    return new Response(null, { status: 400 });
  }

  return Response.json({ accessTokenResponse });
}
