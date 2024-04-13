import { useState } from "react";
import { TextInput } from "react-native";

import { atoms as a } from "#/app/design-system/atoms";
import { size } from "#/app/design-system/size";
import { useHapticFeedback } from "#/app/hooks/useHapticFeedback";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
	placeholder: string;
	value: string;
	// biome-ignore lint/suspicious/noExplicitAny: <i don't give a hoot ts!>
	onChange: (...event: any[]) => void;
};

export const inputStyles = [
	a.roundedLg,
	a.p4,
	a.textLg,
	a.fontSemiBold,
	a.textBase,
	a.border,
	a.border3,
	a.textWhite,
	a.bgSlate800,
	a.borderSlate800,
];

export function Input({ placeholder, value, onChange }: Props) {
	const { styles } = useStyles(stylesheet);
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

const stylesheet = createStyleSheet((theme) => ({
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
