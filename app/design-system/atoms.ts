export const atoms = {
	/**
	 * Text colors
	 */
	textSlate50: {
		color: "rgb(248 250 252)",
	},
	/**
	 * Background colors
	 */
	bgBlue300: {
		backgroundColor: "rgb(147 197 253)",
	},
	bgBlue500: {
		backgroundColor: "rgb(59 130 246)",
	},
	bgSlate950: {
		backgroundColor: "rgb(2 6 23)",
	},
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
		height: 36,
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
	right8: {
		right: 32,
	},
	right10: {
		right: 40,
	},
	bottom3: {
		bottom: 12,
	},
	bottom7: {
		bottom: 28,
	},
	bottom10: {
		bottom: 40,
	},
	bottom12: {
		bottom: 48,
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
	/**
	 * Text size
	 */
	textXs: {
		fontSize: 12,
	},
	textSm: {
		fontSize: 14,
	},
	textBase: {
		fontSize: 16,
	},
	textLg: {
		fontSize: 18,
	},
	textXl: {
		fontSize: 20,
	},
	text2xl: {
		fontSize: 24,
	},
	text3xl: {
		fontSize: 30,
	},
	text4xl: {
		fontSize: 36,
	},
	text5xl: {
		fontSize: 48,
	},
	text6xl: {
		fontSize: 64,
	},
} as const;
