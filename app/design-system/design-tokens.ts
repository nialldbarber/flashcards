import { colors } from "#/app/design-system/colors";

export const darkTheme = {
	/**
	 * Text colors
	 */
	color: {
		mainText: colors.greyOne,
		errorText: colors.destructive,
	},
	/**
	 * Buttons
	 */
	button: {
		primary: colors.primary,
		primaryBorderColor: colors.primary,
		secondary: colors.black,
		secondaryBorderColor: colors.primary,
		tertiary: colors.primary,
		desctructive: colors.destructive,
	},
	/**
	 * Input
	 */
	input: {
		textColor: colors.white,
		backgroundColor: colors.greyTwo,
		backgroundColorFocus: colors.black,
		borderColor: colors.greyTwo,
		placeholderTextColor: colors.greyTwo,
		placeholderTextColorFocus: colors.greyOne,
	},
};

export const lightTheme = {
	/**
	 * Text colors
	 */
	color: {
		mainText: colors.greyOne,
		errorText: colors.destructive,
	},
	/**
	 * Buttons
	 */
	button: {
		primary: colors.primary,
		primaryBorderColor: colors.primary,
		secondary: colors.black,
		secondaryBorderColor: colors.primary,
		tertiary: colors.primary,
		desctructive: colors.destructive,
	},
	/**
	 * Input
	 */
	input: {
		textColor: colors.white,
		backgroundColor: colors.greyTwo,
		backgroundColorFocus: colors.black,
		borderColor: colors.greyTwo,
		placeholderTextColor: colors.greyOne,
		placeholderTextColorFocus: colors.greyTwo,
	},
};

type AppTheme = {
	dark: typeof darkTheme;
	light: typeof lightTheme;
};

declare module "react-native-unistyles" {
	export interface UnistylesThemes extends AppTheme {}
}
