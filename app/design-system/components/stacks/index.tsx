import { Children, type PropsWithChildren } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { SizeScale } from "#/app/design-system/size";
import { size } from "#/app/design-system/size";
import { f } from "#/app/design-system/utils/flatten";

type FlexDirection = "row" | "column";
type PaddingDirection = "horizontal" | "vertical";

export type StackProps = {
	direction: FlexDirection;
	paddingDirection: PaddingDirection;
	margin?: SizeScale;
	marginHorizontal?: SizeScale;
	marginVertical?: SizeScale;
	gutter?: SizeScale;
};

export function Stack({
	direction,
	paddingDirection,
	margin,
	marginHorizontal,
	marginVertical,
	gutter,
	children: childProp,
}: PropsWithChildren<StackProps>) {
	const { styles } = useStyles(stylesheet);

	const children = flattenChildren(childProp);
	const flexDirectionStyle =
		direction === "row" ? styles.row : styles.col;
	const paddingKey =
		paddingDirection === "horizontal" ? "paddingLeft" : "paddingTop";
	const oppositePaddingKey =
		paddingDirection === "horizontal"
			? "paddingRight"
			: "paddingBottom";

	return (
		<View
			style={f([
				flexDirectionStyle,
				{
					margin: size[margin as keyof typeof size],
					marginHorizontal:
						size[marginHorizontal as keyof typeof size],
					marginVertical: size[marginVertical as keyof typeof size],
				},
			])}
		>
			{Children.map(children, (child, index) => {
				const first = index === 0;
				const last = index === children.length - 1;
				return (
					<View
						style={{
							[paddingKey]: first
								? 0
								: size[gutter as keyof typeof size],
							[oppositePaddingKey]: last
								? 0
								: size[gutter as keyof typeof size],
						}}
					>
						{child}
					</View>
				);
			})}
		</View>
	);
}

const stylesheet = createStyleSheet(() => ({
	row: {
		flexDirection: "row",
	},
	col: {
		flexDirection: "column",
	},
}));
