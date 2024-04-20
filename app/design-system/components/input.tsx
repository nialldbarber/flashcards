import { useState } from "react";
import { TextInput } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { size } from "#/app/design-system/size";
import { useHapticFeedback } from "#/app/hooks/useHapticFeedback";

type Props = {
	placeholder: string;
	value: string;
	// biome-ignore lint/suspicious/noExplicitAny: <i don't give a hoot ts!>
	onChange: (...event: any[]) => void;
};

export function Input({ placeholder, value, onChange }: Props) {
	const { styles } = useStyles(inputStylesheet);
	const { invokeHapticFeedback } = useHapticFeedback();

	const [isFocused, setIsFocused] = useState(false);

	return (
		<TextInput
			value={value}
			onChangeText={(text) => onChange(text)}
			style={styles.container(isFocused)}
			placeholder={placeholder}
			placeholderTextColor={styles.placeholderTextColor(isFocused)}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			onPressIn={invokeHapticFeedback}
		/>
	);
}

export const inputStylesheet = createStyleSheet((theme) => ({
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
