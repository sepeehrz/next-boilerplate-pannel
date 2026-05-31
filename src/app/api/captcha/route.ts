import {env} from '@/config';
import {NextResponse} from 'next/server';

export async function POST() {
  const response = await fetch(env.apiUrl + '/User/GenerateCaptcha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    return Response.json(
      {error: 'Failed to fetch captcha'},
      {status: response.status}
    );
  }

  const data = await response.json();

  const nextResponse = NextResponse.json(data);

  const setCookie = response.headers.get('set-cookie');
  if (setCookie) {
    nextResponse.headers.set('set-cookie', setCookie);
  }

  return nextResponse;
}
