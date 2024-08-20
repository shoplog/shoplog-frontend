import { Providers } from '@/app/providers';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
	title: 'Shoplog',
	description: 'Vehicle maintenance and repair log',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn('bg-background min-h-screen font-sans antialiased', inter.variable)}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
