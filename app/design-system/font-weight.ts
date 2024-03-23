export const fontWeight = {
	light: "Cosmica-Light",
	regular: "Cosmica-Regular",
	medium: "Cosmica-Medium",
	semiBold: "Cosmica-SemiBold",
	bold: "Cosmica-Bold",
	extraBold: "Cosmica-ExtraBold",
} as const;

export type FontWeight = keyof typeof fontWeight;
