import { paths } from '@/lib/api/types';
import { getAccessToken } from '@auth0/nextjs-auth0';
import createClient from 'openapi-fetch';

export const shoplogApiClient = async (accessToken?: string) => {
	if (!accessToken) {
		const res = await getAccessToken();

		if (!res.accessToken) {
			throw new Error('No access token found');
		}

		accessToken = res.accessToken;
	}

	return createClient<paths>({
		baseUrl: `${process.env.NEXT_PUBLIC_SHOPLOG_API_URL}/api/v1`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
