import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'base': '#C5E7EB',
			},
			backgroundImage: {
				background: "url('/fundo2.png')",
				'background-2': "url('/bubble1.png')",
				'background-3': "url('/limpeza1.png')",
			},
		},
	},
	plugins: [],
};
export default config;
