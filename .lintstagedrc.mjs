const Configuration = {
	// Type check TypeScript files
	'**/*.(ts)': () => 'pnpm tsc --noEmit',

	// Lint & Prettify TS and JS files
	'**/*.(js|jsx|ts|tsx)': (filenames) => [
		`pnpm eslint ${filenames.join(' ')}`,
		`pnpm prettier --write ${filenames.join(' ')} --plugin-search-dir=.`,
	],

	// Prettify only Markdown and JSON files
	'**/*.(md|json|css)': (filenames) => `yarn prettier --write ${filenames.join(' ')} --plugin-search-dir=.`,
};

export default Configuration;
