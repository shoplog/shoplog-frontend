import { Providers } from '@/app/providers';
import { ThemeSelector } from '@/components';
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Input,
	Sheet,
	SheetContent,
	SheetTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { CircleUser, Home, Menu, NotebookText, Search, Wrench } from 'lucide-react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

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
			<body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
				<Providers>
					<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
						<div className="hidden border-r bg-muted/40 md:block">
							<div className="flex h-full max-h-screen flex-col gap-2">
								<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
									<Link href="/" className="flex items-center gap-2 font-semibold">
										<Wrench className="h-6 w-6" />
										<span className="">Shoplog</span>
									</Link>
								</div>
								<div className="flex-1">
									<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
										<Link
											href="#"
											className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
										>
											<Home className="h-4 w-4" />
											Dashboard
										</Link>
										<Link
											href="#"
											className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
										>
											<NotebookText className="h-4 w-4" />
											Maintenance Logs
										</Link>
									</nav>
								</div>
							</div>
						</div>
						<div className="flex flex-col">
							<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<Sheet>
									<SheetTrigger asChild>
										<Button variant="outline" size="icon" className="shrink-0 md:hidden">
											<Menu className="h-5 w-5" />
											<span className="sr-only">Toggle navigation menu</span>
										</Button>
									</SheetTrigger>
									<SheetContent side="left" className="flex flex-col">
										<nav className="grid gap-2 text-lg font-medium">
											<Link href="#" className="flex items-center gap-2 text-lg font-semibold">
												<Wrench className="h-6 w-6" />
												<span className="sr-only">Shoplog</span>
											</Link>
											<Link
												href="#"
												className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
											>
												<Home className="h-5 w-5" />
												Dashboard
											</Link>
											<Link
												href="#"
												className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
											>
												<NotebookText className="h-5 w-5" />
												Maintenance Logs
											</Link>
										</nav>
									</SheetContent>
								</Sheet>
								<div className="w-full flex-1">
									<form>
										<div className="relative">
											<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
											<Input
												type="search"
												placeholder="Search maintenance logs..."
												className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
											/>
										</div>
									</form>
								</div>
								<ThemeSelector />
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="secondary" size="icon" className="rounded-full">
											<CircleUser className="h-5 w-5" />
											<span className="sr-only">Toggle user menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>My Account</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem>Settings</DropdownMenuItem>
										<DropdownMenuItem>Support</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<a href="/api/auth/logout">Logout</a>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</header>
							<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
