export const darkTheme = {
	/**
	 * Text colors
	 */
	color: {
		mainText: "rgb(248 250 252)",
		errorText: "rgb(239 68 68)",
	},
};

export const lightTheme = {
	/**
	 * Text colors
	 */
	color: {
		mainText: "rgb(248 250 252)",
		errorText: "rgb(239 68 68)",
	},
};

type AppTheme = {
	dark: typeof darkTheme;
	light: typeof lightTheme;
};

declare module "react-native-unistyles" {
	export interface UnistylesThemes extends AppTheme {}
}
