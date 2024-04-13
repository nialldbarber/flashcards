export const baseColors = {
	black: "rgb(2 6 23)",
	blackTwo: "#2b2b2d",
	white: "#f5f5f5",
	whiteTwo: "#F9F4EA",
	whiteThree: "#F2EADC",
	pureWhite: "#fff",
	transparent: "transparent",
} as const;

export const greyColors = {
	greyOne: "rgb(248 250 252)",
	greyTwo: "rgb(30 41 59)",

	// greyOne: "#e5e7eb",
	// greyTwo: "#d1d5db",
	// greyThree: "#f7f7f7",
	// greyFour: "#717171",
	// greyFive: "#eef1ee",
	// greySix: "rgba(209, 213, 219, 0.09)",
	// greySeven: "rgba(209, 213, 219, 0.1)",
	// greyEight: "rgba(209, 213, 219, 0.2)",
} as const;

export const coreColors = {
	/**
	 * Orange color
	 */
	primary: "#734536",
	primaryDark: "#02b52b",
	primaryLight: "rgba(0, 214, 50, 0.5)",
	secondary: "#f5f5f5",
	tertiary: "",
	destructive: "rgb(239 68 68)",
	success: "#DCFCE6",
	warning: "#FEF9C3",
	error: "#FDE2E1",
} as const;

export const tonalColors = {
	orange: "#e2572b",
	orangeLight: "#fae5e1",
} as const;

export type BaseColors = keyof typeof baseColors;
export type GreyColors = keyof typeof greyColors;
export type CoreColors = keyof typeof coreColors;
export type TonalColors = keyof typeof tonalColors;

export type Colors =
	| BaseColors
	| GreyColors
	| CoreColors
	| TonalColors;

export const colors = {
	...baseColors,
	...coreColors,
	...greyColors,
	...tonalColors,
};
