import { paths } from '@/lib/api/types';
import createClient from 'openapi-fetch';

export const shoplogApiClient = createClient<paths>({
	baseUrl: 'http://localhost:3000/api/shoplog/v1',
});
