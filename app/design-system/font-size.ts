import type { TextStyle } from "react-native";

export type TextTypes = "heading" | "text";
export type FontSizes =
	| "10px"
	| "11px"
	| "12px"
	| "14px"
	| "15px"
	| "16px"
	| "18px"
	| "20px"
	| "23px"
	| "26px"
	| "28px"
	| "30px"
	| "34px"
	| "44px";
type TypeHierarchyTypes = Record<
	TextTypes,
	Partial<Record<FontSizes, TextStyle>>
>;

export const typeHierarchy: TypeHierarchyTypes = {
	heading: {
		"18px": {
			fontSize: 18,
			letterSpacing: 0.6,
			lineHeight: 21,
		},
		"20px": {
			fontSize: 20,
			letterSpacing: 0.6,
			lineHeight: 22,
		},
		"23px": {
			fontSize: 23,
			letterSpacing: 0.6,
			lineHeight: 27,
		},
		"26px": {
			fontSize: 26,
			letterSpacing: 0.6,
			lineHeight: 30,
		},
		"28px": {
			fontSize: 28,
			letterSpacing: 0,
			lineHeight: 33,
		},
		"30px": {
			fontSize: 30,
			letterSpacing: 0.6,
			lineHeight: 34,
		},
		"34px": {
			fontSize: 34,
			letterSpacing: 0.6,
			lineHeight: 41,
		},
		"44px": {
			fontSize: 44,
			letterSpacing: 0.4,
			lineHeight: 53,
		},
	},
	text: {
		"10px": {
			fontSize: 10,
			letterSpacing: 0.6,
			lineHeight: 12,
		},
		"11px": {
			fontSize: 11,
			letterSpacing: 0.6,
			lineHeight: 13,
		},
		"12px": {
			fontSize: 12,
			letterSpacing: 0.6,
			lineHeight: 14,
		},
		"14px": {
			fontSize: 14,
			letterSpacing: 0.6,
			lineHeight: 19,
		},
		"15px": {
			fontSize: 15,
			letterSpacing: 0.6,
			lineHeight: 21,
		},
		"16px": {
			fontSize: 16,
			letterSpacing: 0.6,
			lineHeight: 27, // @TODO: maybe change this amount?
		},
		"18px": {
			fontSize: 18,
			letterSpacing: 0.6,
			lineHeight: 27,
		},
		"20px": {
			fontSize: 20,
			letterSpacing: 0.6,
			lineHeight: 24,
		},
		"23px": {
			fontSize: 23,
			letterSpacing: 0.6,
			lineHeight: 27,
		},
	},
} as const;

typeHierarchy.heading["16px"];

export type TypeHierarchy = keyof typeof typeHierarchy;
export type HeadingSize = keyof typeof typeHierarchy.heading;
export type TextSize = keyof typeof typeHierarchy.text;
