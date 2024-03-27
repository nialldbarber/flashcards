import { useEffect } from "react";
import { View, type ViewStyle } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import type { PressableProps } from "#/app/components/core/pressable";
import { Pressable } from "#/app/components/core/pressable";
import { atoms as a } from "#/app/design-system/atoms";
import { Loader } from "#/app/design-system/components/loader";
import type { BaseTextProps } from "#/app/design-system/components/text";
import { Text } from "#/app/design-system/components/text";
import { flatten } from "#/app/design-system/utils/flatten";
import { useButtonAnimation } from "#/app/hooks/useButtonAnimation";

export type Variant =
	| "primary"
	| "secondary"
	| "tertiary"
	| "link"
	| "destructive";

export type Shape = "small" | "medium" | "large" | "circle";

interface ButtonProps extends PressableProps, BaseTextProps {
	variant?: Variant;
	shape?: Shape;
	isDisabled?: boolean;
	isPending?: boolean;
	children: string | JSX.Element;
	buttonStyles?: ViewStyle;
}

function disableOnPending(props: ButtonProps) {
	if (props.isPending) {
		props.onPress = undefined;
		props.onLongPress = undefined;
		props.onPressIn = undefined;
		props.onPressOut = undefined;
	}
	return props;
}

export function Button(props: ButtonProps) {
	const updatedProps = disableOnPending(props);
	const {
		variant = "primary",
		shape = "medium",
		isDisabled = false,
		isPending = false,
		children,
		weight,
		size,
		buttonStyles,
		...rest
	} = updatedProps;

	const { onPress, animatedStyle } = useButtonAnimation();
	const accessibilityLabel = `${children} button`;
	const isCircleButton = shape !== "circle";

	const loader = useSharedValue(0);
	const loaderStyle = useAnimatedStyle(() => ({
		opacity: loader.value,
	}));

	useEffect(() => {
		if (isPending) {
			loader.value = withTiming(1, { duration: 500 });
		} else {
			loader.value = withTiming(0, { duration: 100 });
		}
	}, [isPending, loader]);

	return (
		<Animated.View
			style={flatten([a.itemsCenter, a.justifyCenter, animatedStyle])}
		>
			<Pressable
				{...rest}
				style={flatten([
					a.relative,
					a.itemsCenter,
					a.justifyCenter,
					buttonStyles,
					isCircleButton && {
						...a.bgBlue500,
						...a.h15,
						...a.px6,
						...a.roundedFull,
					},
				])}
				onPressIn={() => onPress("in")}
				onPressOut={() => onPress("out")}
				accessibilityRole="button"
				aria-label={accessibilityLabel}
				accessibilityState={{ disabled: isDisabled, busy: isPending }}
			>
				<View style={a.flexRow}>
					<Text size={size} weight={weight}>
						{children}
					</Text>
				</View>
			</Pressable>
			<View style={flatten([a.absolute, a.right7, a.top4])}>
				<Animated.View style={loaderStyle}>
					<Loader />
				</Animated.View>
			</View>
		</Animated.View>
	);
}
