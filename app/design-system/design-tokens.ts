export const darkTheme = {
	/**
	 * Text colors
	 */
	color: {
		mainText: "rgb(248 250 252)",
		errorText: "rgb(239 68 68)",
	},
	/**
	 * Buttons
	 */
	button: {
		primary: "#734536",
		primaryBorderColor: "#734536",

		secondary: "rgb(2 6 23)",
		secondaryBorderColor: "#734536",

		tertiary: "#734536",

		desctructive: "rgb(239 68 68)",
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
	/**
	 * Buttons
	 */
	button: {
		primary: "#734536",
		primaryBorderColor: "#734536",
		secondary: "rgb(2 6 23)",
		secondaryBorderColor: "#734536",
		tertiary: "#734536",
		desctructive: "rgb(239 68 68)",
	},
};

type AppTheme = {
	dark: typeof darkTheme;
	light: typeof lightTheme;
};

declare module "react-native-unistyles" {
	export interface UnistylesThemes extends AppTheme {}
}
