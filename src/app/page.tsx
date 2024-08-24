import { ThemeSelector } from '@/components';
import { Button } from '@/components/ui';
import { shoplogApiClient } from '@/lib/api';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Home() {
	const { data, error } = await shoplogApiClient.GET('/vpic/years');

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Button asChild>
				<a href="/api/auth/logout">Logout</a>
			</Button>
			{error && <div>{error.detail}</div>}
			<ul>{data?.map((year) => <li key={year}>{year}</li>)}</ul>
			<ThemeSelector />
		</main>
	);
});
