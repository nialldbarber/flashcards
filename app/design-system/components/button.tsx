import { useEffect } from "react";
import { View, type ViewStyle } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import type { PressableProps } from "#/app/components/core/pressable";
import { Pressable } from "#/app/components/core/pressable";
import { Loader } from "#/app/design-system/components/loader";
import type { BaseTextProps } from "#/app/design-system/components/text";
import { Text } from "#/app/design-system/components/text";
import { radii } from "#/app/design-system/radii";
import { size } from "#/app/design-system/size";
import { f } from "#/app/design-system/utils/flatten";
import type { ButtonAnimationType } from "#/app/hooks/useButtonAnimation";
import { useButtonAnimation } from "#/app/hooks/useButtonAnimation";
import { useEffectIgnoreDeps } from "#/app/hooks/useEffectIgnoreDeps";
import { createStyleSheet, useStyles } from "react-native-unistyles";

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
	animationType?: ButtonAnimationType;
	resetAnimation?: boolean;
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
		animationType = "standard",
		resetAnimation = false,
		onPress,
		...rest
	} = updatedProps;

	const { styles } = useStyles(stylesheet, { variant });

	const { onPressInOut, onPressSpin, style } = useButtonAnimation(
		animationType as ButtonAnimationType,
	);
	const accessibilityLabel = `${children} button`;
	const isStandardButton = shape !== "circle";

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

	const invokeOnPress = () => {
		if (onPress) {
			onPress();
			onPressSpin();
		}
	};

	useEffectIgnoreDeps(() => {
		if (animationType === "spin" && resetAnimation) {
			setTimeout(() => {
				onPressSpin();
			}, 1000);
		}
	}, [resetAnimation, animationType]);

	const overrideNonStandardButtonStyles = !isStandardButton
		? { backgroundColor: "transparent" }
		: {};

	return (
		<Animated.View style={f([styles.animatedContainer, style])}>
			<Pressable
				{...rest}
				style={f([
					styles.container(isStandardButton),
					buttonStyles,
					overrideNonStandardButtonStyles,
				])}
				onPress={invokeOnPress}
				onPressIn={() => onPressInOut("in")}
				onPressOut={() => onPressInOut("out")}
				accessibilityRole="button"
				aria-label={accessibilityLabel}
				accessibilityState={{ disabled: isDisabled, busy: isPending }}
			>
				<View style={styles.wrapper}>
					<Text size={size} weight={weight}>
						{children}
					</Text>
				</View>
			</Pressable>
			<View style={styles.spinner}>
				<Animated.View style={loaderStyle}>
					<Loader />
				</Animated.View>
			</View>
		</Animated.View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: (isStandardButton: boolean) => ({
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		height: isStandardButton ? size["64px"] : size.auto,
		paddingHorizontal: isStandardButton ? size["24px"] : size.auto,
		borderRadius: isStandardButton ? radii.full : radii.none,
		borderWidth: size["4px"],
		variants: {
			variant: {
				primary: {
					backgroundColor: theme.button.primary,
					borderColor: theme.button.primaryBorderColor,
				},
				secondary: {
					backgroundColor: theme.button.secondary,
					borderColor: theme.button.secondaryBorderColor,
				},
				tertiary: {
					backgroundColor: theme.button.tertiary,
				},
				link: {
					backgroundColor: theme.button.tertiary,
				},
				destructive: {
					backgroundColor: theme.button.desctructive,
				},
			},
		},
	}),
	wrapper: {
		flexDirection: "row",
	},
	spinner: {
		position: "absolute",
		right: size["28px"],
		top: size["16px"],
	},
	animatedContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
}));
