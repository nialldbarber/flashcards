export const baseColors = {
	black: "rgb(2 6 23)",
	blackTwo: "#2b2b2d",
	white: "#f5f5f5",
	whiteTwo: "#F9F4EA",
	whiteThree: "#F2EADC",
	pureWhite: "#fff",
	darkBlue: "#0f172a",
	transparent: "transparent",
} as const;

export const greyColors = {
	greyOne: "rgb(248 250 252)",
	greyTwo: "rgb(30 41 59)",
} as const;

export const coreColors = {
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

export const themeColors = [
	{ color: "blue", hex: "#0091ff", faded: "rgba(0, 145, 255, 0.2)" },
	{ color: "red", hex: "#e5484d", faded: "rgba(229, 72, 77, 0.2)" },
	{ color: "pink", hex: "#d6409f", faded: "rgba(214, 64, 159, 0.2)" },
	{
		color: "orange",
		hex: "#f76808",
		faded: "rgba(247, 104, 8, 0.2)",
	},
	{
		color: "green",
		hex: "#30a46c",
		faded: "rgba(48, 164, 108, 0.2)",
	},
	{
		color: "yellow",
		hex: "#f5d90a",
		faded: "rgba(245, 217, 10, 0.2)",
	},
] as const;

export const experimentalColors = {
	experimentalBlack: "rgba(0, 0, 0, 0.8)",
} as const;

export type ThemeColor = (typeof themeColors)[number];
export type BaseColors = keyof typeof baseColors;
export type GreyColors = keyof typeof greyColors;
export type CoreColors = keyof typeof coreColors;
export type TonalColors = keyof typeof tonalColors;
export type ExperimentalColors = keyof typeof experimentalColors;

export type Colors =
	| BaseColors
	| GreyColors
	| CoreColors
	| TonalColors
	| ExperimentalColors;

export const colors = {
	...baseColors,
	...coreColors,
	...greyColors,
	...tonalColors,
	...experimentalColors,
};
