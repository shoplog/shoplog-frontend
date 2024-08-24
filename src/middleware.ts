import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/api/shoplog')) {
		const newResponse = NextResponse.next();
		const { accessToken } = await getAccessToken(request, newResponse);
		newResponse.headers.set('Authorization', `Bearer ${accessToken}`);

		return newResponse;
	}
}
