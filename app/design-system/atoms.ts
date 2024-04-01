import { StyleSheet } from "react-native";

export const atoms = {
	/**
	 * Text colors
	 */
	textWhite: {
		color: "#fff",
	},
	textSlate50: {
		color: "rgb(248 250 252)",
	},
	textSlate900: {
		color: "rgb(17 24 39)",
	},
	textSlate950: {
		color: "rgb(2 6 23)",
	},
	textRed500: {
		color: "rgb(239 68 68)",
	},
	textOrange: {
		color: "#FF8A65",
	},
	/**
	 * Background colors
	 */
	bgTransparent: {
		backgroundColor: "transparent",
	},
	bgWhite: {
		backgroundColor: "#fff",
	},
	bgBlue300: {
		backgroundColor: "rgb(147 197 253)",
	},
	bgBlue500: {
		backgroundColor: "rgb(59 130 246)",
	},
	bgSlate50: {
		backgroundColor: "rgb(248 250 252)",
	},
	bgSlate600: {
		backgroundColor: "rgb(71 85 105)",
	},
	bgSlate800: {
		backgroundColor: "rgb(30 41 59)",
	},
	bgSlate950: {
		backgroundColor: "rgb(2 6 23)",
	},
	bgOrange: {
		backgroundColor: "#FF8A65",
	},
	bgOrangeFaded: {
		backgroundColor: "#734536",
	},
	bgGray50: {
		backgroundColor: "rgb(248 250 252)",
	},
	bgRed: {
		backgroundColor: "rgb(239 68 68)",
	},
	bgDarkBlue: {
		backgroundColor: "#0f172a",
	},
	/**
	 * Flexbox
	 */
	flex: {
		display: "flex",
	},
	flex1: {
		flex: 1,
	},
	flexRow: {
		flexDirection: "row",
	},
	justifyCenter: {
		justifyContent: "center",
	},
	justifyBetween: {
		justifyContent: "space-between",
	},
	justifyAround: {
		justifyContent: "space-around",
	},
	justifyEnd: {
		justifyContent: "flex-end",
	},
	justifyStart: {
		justifyContent: "flex-start",
	},
	itemsStart: {
		alignItems: "flex-start",
	},
	itemsEnd: {
		alignItems: "flex-end",
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
	p0: {
		padding: 0,
	},
	px0: {
		paddingHorizontal: 0,
	},
	py0: {
		paddingVertical: 0,
	},
	p1: {
		padding: 4,
	},
	px1: {
		paddingHorizontal: 4,
	},
	py1: {
		paddingVertical: 4,
	},
	p2: {
		padding: 8,
	},
	px2: {
		paddingHorizontal: 8,
	},
	py2: {
		paddingVertical: 8,
	},
	p3: {
		padding: 12,
	},
	px3: {
		paddingHorizontal: 12,
	},
	py3: {
		paddingVertical: 12,
	},
	p4: {
		padding: 16,
	},
	px4: {
		paddingHorizontal: 16,
	},
	py4: {
		paddingVertical: 16,
	},
	p5: {
		padding: 20,
	},
	px5: {
		paddingHorizontal: 5,
	},
	px6: {
		paddingHorizontal: 24,
	},
	px7: {
		paddingHorizontal: 28,
	},
	px8: {
		paddingHorizontal: 32,
	},
	px9: {
		paddingHorizontal: 36,
	},
	px10: {
		paddingHorizontal: 40,
	},
	pt1: {
		paddingTop: 4,
	},
	pt2: {
		paddingTop: 8,
	},
	pt3: {
		paddingTop: 12,
	},
	pt4: {
		paddingTop: 16,
	},
	pt5: {
		paddingTop: 20,
	},
	pt6: {
		paddingTop: 24,
	},
	pt7: {
		paddingTop: 28,
	},
	pt8: {
		paddingTop: 32,
	},
	pt9: {
		paddingTop: 36,
	},
	pt10: {
		paddingTop: 40,
	},
	pb1: {
		paddingBottom: 4,
	},
	pb2: {
		paddingBottom: 8,
	},
	pb3: {
		paddingBottom: 12,
	},
	pb4: {
		paddingBottom: 16,
	},
	pb5: {
		paddingBottom: 20,
	},
	pb6: {
		paddingBottom: 24,
	},
	pb7: {
		paddingBottom: 28,
	},
	pb8: {
		paddingBottom: 32,
	},
	pb9: {
		paddingBottom: 36,
	},
	pb10: {
		paddingBottom: 40,
	},
	/**
	 * Margin
	 */
	mx0: {
		marginHorizontal: 0,
	},
	mx1: {
		marginHorizontal: 4,
	},
	mx2: {
		marginHorizontal: 8,
	},
	mx3: {
		marginHorizontal: 12,
	},
	mx4: {
		marginHorizontal: 16,
	},
	mx5: {
		marginHorizontal: 20,
	},
	my5: {
		marginVertical: 5,
	},
	my6: {
		marginVertical: 24,
	},
	my7: {
		marginVertical: 28,
	},
	mt1: {
		marginTop: 4,
	},
	mt2: {
		marginTop: 8,
	},
	mt3: {
		marginTop: 12,
	},
	mt4: {
		marginTop: 16,
	},
	mt5: {
		marginTop: 20,
	},
	mt6: {
		marginTop: 24,
	},
	mt7: {
		marginTop: 28,
	},
	mt8: {
		marginTop: 32,
	},
	mt9: {
		marginTop: 36,
	},
	mt10: {
		marginTop: 40,
	},
	mt11: {
		marginTop: 44,
	},
	mt12: {
		marginTop: 48,
	},
	mb1: {
		marginBottom: 4,
	},
	mb2: {
		marginBottom: 8,
	},
	mb3: {
		marginBottom: 12,
	},
	mb4: {
		marginBottom: 16,
	},
	mb5: {
		marginBottom: 20,
	},
	mb6: {
		marginBottom: 24,
	},
	mb7: {
		marginBottom: 28,
	},
	mb8: {
		marginBottom: 32,
	},
	mb9: {
		marginBottom: 36,
	},
	mb10: {
		marginBottom: 40,
	},
	mb11: {
		marginBottom: 44,
	},
	mb12: {
		marginBottom: 48,
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
		height: 36,
	},
	h10: {
		height: 40,
	},
	h11: {
		height: 44,
	},
	h12: {
		height: 48,
	},
	h13: {
		height: 52,
	},
	h14: {
		height: 56,
	},
	h15: {
		height: 60,
	},
	hFull: {
		height: "100%",
	},
	/**
	 * Width
	 */
	wFull: {
		width: "100%",
	},
	w0: {
		width: 0,
	},
	wpx: {
		width: 1,
	},
	"wh0.5": {
		width: 2,
	},
	w1: {
		width: 4,
	},
	w2: {
		width: 8,
	},
	w3: {
		width: 12,
	},
	"wh3.5": {
		width: 14,
	},
	w4: {
		width: 16,
	},
	w5: {
		width: 20,
	},
	w6: {
		width: 24,
	},
	w7: {
		width: 28,
	},
	w8: {
		width: 32,
	},
	w9: {
		width: 36,
	},
	w10: {
		width: 40,
	},
	/**
	 * Top / Right / Bottom / Left
	 */
	inset0: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
	top0: {
		top: 0,
	},
	top1: {
		top: 4,
	},
	top2: {
		top: 8,
	},
	top3: {
		top: 12,
	},
	top4: {
		top: 16,
	},
	top5: {
		top: 20,
	},
	top6: {
		top: 24,
	},
	top7: {
		top: 28,
	},
	top8: {
		top: 32,
	},
	top10: {
		top: 40,
	},
	right0: {
		right: 0,
	},
	right1: {
		right: 4,
	},
	right2: {
		right: 8,
	},
	right3: {
		right: 12,
	},
	right4: {
		right: 16,
	},
	right5: {
		right: 20,
	},
	right6: {
		right: 24,
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
	left0: {
		left: 0,
	},
	left1: {
		left: 4,
	},
	left2: {
		left: 8,
	},
	left3: {
		left: 12,
	},
	left4: {
		left: 16,
	},
	left5: {
		left: 20,
	},
	bottom0: {
		bottom: 0,
	},
	bottom1: {
		bottom: 4,
	},
	bottom2: {
		bottom: 8,
	},
	bottom3: {
		bottom: 12,
	},
	bottom4: {
		bottom: 16,
	},
	bottom5: {
		bottom: 20,
	},
	bottom6: {
		bottom: 24,
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
	bottom16: {
		bottom: 64,
	},
	bottom20: {
		bottom: 80,
	},
	bottom24: {
		bottom: 96,
	},
	bottom28: {
		bottom: 112,
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
	roundedBNone: {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	roundedBSm: {
		borderBottomLeftRadius: 2,
		borderBottomRightRadius: 2,
	},
	roundedB: {
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4,
	},
	roundedBMd: {
		borderBottomLeftRadius: 6,
		borderBottomRightRadius: 6,
	},
	roundedBLg: {
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
	},
	roundedBXl: {
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
	},
	roundedB2xl: {
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
	},
	roundedB3xl: {
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
	},
	roundedBFull: {
		borderBottomLeftRadius: 9999,
		borderBottomRightRadius: 9999,
	},
	roundedTNone: {
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},
	roundedTSm: {
		borderTopLeftRadius: 2,
		borderTopRightRadius: 2,
	},
	roundedT: {
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
	},
	roundedTMd: {
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
	},
	roundedTLg: {
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	roundedTXl: {
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	roundedT2xl: {
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	roundedT3xl: {
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
	},
	roundedTFull: {
		borderTopLeftRadius: 9999,
		borderTopRightRadius: 9999,
	},
	/**
	 * Border color
	 */
	borderTransparent: {
		borderColor: "transparent",
	},
	borderBlue300: {
		borderColor: "rgb(147 197 253)",
	},
	borderBlue500: {
		borderColor: "rgb(59 130 246)",
	},
	borderSlate50: {
		borderColor: "rgb(248 250 252)",
	},
	borderSlate800: {
		borderColor: "rgb(30 41 59)",
	},
	borderSlate950: {
		borderColor: "rgb(2 6 23)",
	},
	borderOrange: {
		borderColor: "#FF8A65",
	},
	borderOrangeFaded: {
		borderColor: "#734536",
	},
	borderRed: {
		borderColor: "rgb(239 68 68)",
	},
	/**
	 * Border width
	 */
	border: {
		borderWidth: 1,
	},
	border2: {
		borderWidth: 2,
	},
	border3: {
		borderWidth: 3,
	},
	border4: {
		borderWidth: 4,
	},
	border8: {
		borderWidth: 8,
	},
	/**
	 * Font family
	 */
	fontLight: {
		fontFamily: "Cosmica-Light",
	},
	fontRegular: {
		fontFamily: "Cosmica-Regular",
	},
	fontMedium: {
		fontFamily: "Cosmica-Medium",
	},
	fontSemiBold: {
		fontFamily: "Cosmica-SemiBold",
	},
	fontBold: {
		fontFamily: "Cosmica-Bold",
	},
	fontExtraBold: {
		fontFamily: "Cosmica-ExtraBold",
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
	/**
	 * Text alignment
	 */
	textCenter: {
		textAlign: "center",
	},
	/**
	 * Z-index
	 */
	_z1: {
		zIndex: -1,
	},
	_z2: {
		zIndex: -2,
	},
	z0: {
		zIndex: 0,
	},
	z10: {
		zIndex: 10,
	},
	z12: {
		zIndex: 12,
	},
	/**
	 * Fill space
	 */
	fillSpace: {
		...StyleSheet.absoluteFillObject,
	},
	/**
	 * Visibility
	 */
	backfaceVisible: {
		backfaceVisibility: "visible",
	},
} as const;
