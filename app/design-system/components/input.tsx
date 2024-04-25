import { CloseCircle } from "iconsax-react-native";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Pressable } from "#/app/components/core/pressable";
import { colors } from "#/app/design-system/colors";
import { size } from "#/app/design-system/size";
import { useHapticFeedback } from "#/app/hooks/useHapticFeedback";

type Props = {
	placeholder: string;
	value: string;
	// biome-ignore lint/suspicious/noExplicitAny: <i don't give a hoot ts!>
	onChange: (...event: any[]) => void;
	handleRemove?: () => void;
};

export function Input({
	placeholder,
	value,
	onChange,
	handleRemove,
}: Props) {
	const { styles } = useStyles(inputStylesheet);
	const { invokeHapticFeedback } = useHapticFeedback();
	const [isFocused, setIsFocused] = useState(false);
	const opacity = useSharedValue(0);
	const scale = useSharedValue(1);

	const opacityStyles = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));
	const scaleStyles = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const handlePressIn = () => {
		scale.value = withTiming(0.9);
	};

	const handlePressOut = () => {
		scale.value = withTiming(1);
	};

	useEffect(() => {
		if (value?.length > 0) {
			opacity.value = withTiming(1);
		} else {
			opacity.value = withTiming(0);
		}
	}, [value, opacity]);

	return (
		<View>
			<TextInput
				value={value}
				onChangeText={(text) => onChange(text)}
				style={styles.container(isFocused)}
				placeholder={placeholder}
				placeholderTextColor={
					styles.placeholderTextColor(isFocused).color
				}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onPressIn={invokeHapticFeedback}
			/>
			<Animated.View
				style={[styles.clear, opacityStyles, scaleStyles]}
			>
				<Pressable
					onPress={handleRemove}
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
				>
					<CloseCircle
						color={colors.brandMain}
						variant="Bulk"
						size={25}
					/>
				</Pressable>
			</Animated.View>
		</View>
	);
}

export const inputStylesheet = createStyleSheet((theme) => ({
	wrapper: {
		position: "relative",
	},
	clear: {
		position: "absolute",
		right: size["16px"],
		top: size["16px"],
	},
	container: (isFocused: boolean) => ({
		borderRadius: size["8px"],
		padding: size["16px"],
		fontSize: size["18px"],
		borderWidth: size["3px"],
		color: theme.input.textColor,
		backgroundColor: isFocused
			? theme.input.backgroundColorFocus
			: theme.input.backgroundColor,
		borderColor: theme.input.borderColor,
	}),
	placeholderTextColor: (isFocused: boolean) => ({
		color: isFocused
			? theme.input.placeholderTextColorFocus
			: theme.input.placeholderTextColor,
	}),
}));
