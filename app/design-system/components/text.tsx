import React, { useMemo } from "react";
import type { TextProps as NativeTextProps, TextStyle } from "react-native";
import { Text as NativeText, StyleSheet } from "react-native";
// import type { Colors } from "@/app/design-system/colors";
// import { colors } from "@/app/design-system/colors";
// import type { FontSizes, TextTypes } from "@/app/design-system/font-size";
// import { typeHierarchy } from "@/app/design-system/font-size";
// import type { FontWeight } from "@/app/design-system/font-weight";
// import { fontWeight } from "@/app/design-system/font-weight";
import { maxFontSizeMultiplier } from "#/app/design-system/constants/maxFontSizeMultiplier";
import { flatten } from "#/app/design-system/utils/flatten";
import { renderStringWithEmoji } from "#/app/design-system/utils/renderStringWithEmoji";

export type BaseTextProps = {
	/**
	 * The explicit font size of
	 * the text
	 */
	size?: FontSizes;
	/**
	 * The explicit font weight of
	 * the text
	 */
	weight?: FontWeight;
	/**
	 * Whether this is a heading or
	 * base text
	 */
	level?: TextTypes;
	/**
	 * The explicit color of
	 * the text
	 */
	color?: Colors;
	/**
	 * Any additional styles overrides
	 * to be applied to the text
	 */
	textStyles?: TextStyle;
	/**
	 * Use if a string contains an
	 * emoji - this fixes the line
	 * height issue prevelant on
	 * mobile devices
	 */
	withEmoji?: boolean;
	/**
	 * The accessibility hint for
	 * the text
	 */
	a11yHint?: string;
};

export interface TextProps extends NativeTextProps, BaseTextProps {}

export function Text({
	weight = "bold",
	level = "text",
	size = level === "heading" ? "18px" : "16px",
	color,
	withEmoji = false,
	a11yHint,
	textStyles,
	children,
}: TextProps) {
	const renderChildren = useMemo(() => {
		return React.Children.map(children, (child) => {
			if (typeof child === "string") {
				return withEmoji ? renderStringWithEmoji(child) : child;
			}
			if (React.isValidElement(child)) {
				return React.cloneElement(child, {
					// @ts-expect-error
					style: {
						...child.props.style,
						alignSelf: "baseline",
					},
				});
			}
			return child;
		});
	}, [children, withEmoji]);

	return (
		<NativeText
			style={[styles.text, flatten(textStyles)]}
			maxFontSizeMultiplier={maxFontSizeMultiplier}
			accessibilityRole={level === "heading" ? "header" : "text"}
			accessibilityHint={a11yHint}
		>
			{renderChildren}
		</NativeText>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Cosmica-Bold",
		color: "orange",
		fontSize: 30,
		// ...(level === "heading"
		//   ? typeHierarchy.heading[size]
		//   : typeHierarchy.text[size]),
		// fontFamily: fontWeight[weight],
		// color: color ? colors[color] : theme.colors.textColor,
	},
});
