import React, { useMemo } from "react";
import type {
	TextProps as NativeTextProps,
	TextStyle,
} from "react-native";
import { Text as NativeText } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { colors, type Colors } from "#/app/design-system/colors";
import { maxFontSizeMultiplier } from "#/app/design-system/constants/maxFontSizeMultiplier";
import type {
	FontSizes,
	TextTypes,
} from "#/app/design-system/font-size";
import { typeHierarchy } from "#/app/design-system/font-size";
import type { FontWeight } from "#/app/design-system/font-weight";
import { fontWeight } from "#/app/design-system/font-weight";
import { f } from "#/app/design-system/utils/flatten";
import { renderStringWithEmoji } from "#/app/design-system/utils/renderStringWithEmoji";

export type BaseTextProps = {
	size?: FontSizes;
	weight?: FontWeight;
	level?: TextTypes;
	overideStyles?: TextStyle;
	withEmoji?: boolean;
	color?: Colors;
	a11yHint?: string;
	isError?: boolean;
};

export interface TextProps extends NativeTextProps, BaseTextProps {}

export function Text({
	weight = "bold",
	level = "text",
	size = level === "heading" ? "18px" : "16px",
	withEmoji = false,
	a11yHint,
	color,
	overideStyles,
	isError = false,
	children,
}: TextProps) {
	const { styles } = useStyles(stylesheet);

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

	const textStyle = (
		styles.text as (
			size: FontSizes,
			level: TextTypes,
			weight: FontWeight,
			color: Colors | undefined,
			isError: boolean,
		) => TextStyle
	)(size, level, weight, color, isError);

	return (
		<NativeText
			style={f([textStyle, overideStyles])}
			maxFontSizeMultiplier={maxFontSizeMultiplier}
			accessibilityRole={level === "heading" ? "header" : "text"}
			accessibilityHint={a11yHint}
		>
			{renderChildren}
		</NativeText>
	);
}

// biome-ignore lint/suspicious/noExplicitAny: <unknown>
const stylesheet = createStyleSheet((theme): any => ({
	text: (
		size: FontSizes,
		level: TextTypes,
		weight: FontWeight,
		color: Colors,
		isError: boolean,
	): TextStyle => ({
		...(level === "heading"
			? typeHierarchy.heading[size]
			: typeHierarchy.text[size]),
		fontFamily: fontWeight[weight],
		color: color
			? colors[color]
			: isError
				? theme.color.errorText
				: theme.color.mainText,
	}),
}));
