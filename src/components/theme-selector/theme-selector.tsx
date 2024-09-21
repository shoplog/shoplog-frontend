'use client';

import { Button } from '@/components/ui';
import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSelector() {
	const [mounted, setMounted] = useState(false);
	const { theme, themes, setTheme } = useTheme();
	const hasThemes = themes.length > 0;

	const getNextTheme = () => {
		if (!hasThemes) {
			return 'system';
		}

		if (!theme) {
			return themes[0];
		}

		const currentIndex = themes.indexOf(theme);
		const nextIndex = (currentIndex + 1) % themes.length;
		return themes[nextIndex];
	};

	const renderInitialThemeButton = () => {
		return (
			<Button variant="secondary" size="icon" disabled>
				<SunMoon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
				<span className="sr-only">Toggle theme</span>
			</Button>
		);
	};

	const renderThemeButton = () => {
		if (!theme || theme === 'system') {
			return <SunMoon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />;
		} else {
			return (
				<>
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				</>
			);
		}
	};

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return renderInitialThemeButton();
	}

	return hasThemes ? (
		<Button variant="secondary" size="icon" onClick={() => setTheme(getNextTheme())}>
			{renderThemeButton()}
			<span className="sr-only">Toggle theme</span>
		</Button>
	) : (
		renderInitialThemeButton()
	);
}
