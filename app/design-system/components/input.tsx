import { useState } from "react";
import { TextInput } from "react-native";

import { atoms as a } from "#/app/design-system/atoms";
import { flatten } from "#/app/design-system/utils/flatten";
import { useHapticFeedback } from "#/app/hooks/useHapticFeedback";

type Props = {
	placeholder: string;
	value: string;
	// biome-ignore lint/suspicious/noExplicitAny: <i don't give a hoot ts!>
	onChange: (...event: any[]) => void;
};

export function Input({ placeholder, value, onChange }: Props) {
	const [isFocused, setIsFocused] = useState(false);
	const { invokeHapticFeedback } = useHapticFeedback();

	return (
		<TextInput
			value={value}
			onChangeText={(text) => onChange(text)}
			style={flatten([
				a.roundedLg,
				a.p4,
				a.textLg,
				a.fontSemiBold,
				a.textBase,
				a.border,
				a.border3,
				isFocused ? a.bgSlate950 : a.bgSlate800,
				isFocused ? a.borderBlue300 : a.borderSlate800,
			])}
			placeholder={placeholder}
			placeholderTextColor={
				isFocused ? a.textWhite.color : a.textSlate50.color
			}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			onPressIn={invokeHapticFeedback}
		/>
	);
}
