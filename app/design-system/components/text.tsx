import React, { useMemo } from "react";
import type {
	TextProps as NativeTextProps,
	TextStyle,
} from "react-native";
import { Text as NativeText, StyleSheet } from "react-native";

import { colors, type Colors } from "#/app/design-system/colors";
import { maxFontSizeMultiplier } from "#/app/design-system/constants/maxFontSizeMultiplier";
import type {
	FontSizes,
	TextTypes,
} from "#/app/design-system/font-size";
import { typeHierarchy } from "#/app/design-system/font-size";
import type { FontWeight } from "#/app/design-system/font-weight";
import { fontWeight } from "#/app/design-system/font-weight";
import { flatten } from "#/app/design-system/utils/flatten";
import { renderStringWithEmoji } from "#/app/design-system/utils/renderStringWithEmoji";

export type BaseTextProps = {
	size?: FontSizes;
	weight?: FontWeight;
	level?: TextTypes;
	color?: Colors;
	styles?: TextStyle;
	withEmoji?: boolean;
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
	styles,
	children,
}: TextProps) {
	const renderChildren = useMemo(() => {
		return React.Children.map(children, (child) => {
			if (typeof child === "string") {
				return withEmoji ? renderStringWithEmoji(child) : child;
			}
			if (React.isValidElement(child)) {
				const childWithStyle = child as React.ReactElement<{
					style?: React.CSSProperties;
				}>;
				return React.cloneElement(childWithStyle, {
					style: {
						...childWithStyle.props.style,
						alignSelf: "baseline",
					},
				});
			}
			return child;
		});
	}, [children, withEmoji]);

	const _styles = StyleSheet.create({
		text: {
			...(level === "heading"
				? typeHierarchy.heading[size]
				: typeHierarchy.text[size]),
			fontFamily: fontWeight[weight],
			color: color ? colors[color] : colors.black,
		},
	});

	return (
		<NativeText
			style={[_styles.text, flatten(styles)]}
			maxFontSizeMultiplier={maxFontSizeMultiplier}
			accessibilityRole={level === "heading" ? "header" : "text"}
			accessibilityHint={a11yHint}
		>
			{renderChildren}
		</NativeText>
	);
}
