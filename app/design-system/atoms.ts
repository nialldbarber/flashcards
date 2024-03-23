export const atoms = {
	/**
	 * Flexbox
	 */
	flex1: {
		flex: 1,
	},
	flexRow: {
		flexDirection: "row",
	},
	justifyCenter: {
		justifyContent: "center",
	},
	itemsCenter: {
		alignItems: "center",
	},
	/**
	 * Position
	 */
	relative: {
		position: "relative",
	},
	absolute: {
		position: "absolute",
	},
	/**
	 * Padding
	 */
	px5: {
		paddingHorizontal: 5,
	},
	/**
	 * Height
	 */
	h0: {
		height: 0,
	},
	hpx: {
		height: 1,
	},
	"h0.5": {
		height: 2,
	},
	h1: {
		height: 4,
	},
	h2: {
		height: 8,
	},
	h3: {
		height: 12,
	},
	"h3.5": {
		height: 14,
	},
	h4: {
		height: 16,
	},
	h5: {
		height: 20,
	},
	h6: {
		height: 24,
	},
	h7: {
		height: 28,
	},
	h8: {
		height: 32,
	},
	h9: {
		height: 36, // 36px
	},
	h10: {
		height: 40,
	},
	/**
	 * Width
	 */
	w0: {
		height: 0,
	},
	wpx: {
		height: 1,
	},
	"wh0.5": {
		height: 2,
	},
	w1: {
		height: 4,
	},
	w2: {
		height: 8,
	},
	w3: {
		height: 12,
	},
	"wh3.5": {
		height: 14,
	},
	w4: {
		height: 16,
	},
	w5: {
		height: 20,
	},
	w6: {
		height: 24,
	},
	w7: {
		height: 28,
	},
	w8: {
		height: 32,
	},
	w9: {
		height: 36, // 36px
	},
	w10: {
		height: 40,
	},
	/**
	 * Top / Right / Bottom / Left
	 */
	top4: {
		top: 16,
	},
	right7: {
		right: 28,
	},
	/**
	 * Border radius
	 */
	roundedNone: {
		borderRadius: 0,
	},
	roundedSm: {
		borderRadius: 2,
	},
	rounded: {
		borderRadius: 4,
	},
	roundedMd: {
		borderRadius: 6,
	},
	roundedLg: {
		borderRadius: 8,
	},
	roundedXl: {
		borderRadius: 12,
	},
	rounded2xl: {
		borderRadius: 16,
	},
	rounded3xl: {
		borderRadius: 24,
	},
	roundedFull: {
		borderRadius: 9999,
	},
} as const;
