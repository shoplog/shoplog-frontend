import { Button } from '@/components/ui/button';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Button asChild>
				<a href="/api/auth/logout">Logout</a>
			</Button>
		</main>
	);
});
