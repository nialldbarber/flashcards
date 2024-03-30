import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native";

import { atoms as a } from "#/app/design-system/atoms";
import { flatten } from "#/app/design-system/utils/flatten";

type Props = {
	value: string;
	// biome-ignore lint/suspicious/noExplicitAny: <i don't give a hoot ts!>
	onChange: (...event: any[]) => void;
};

export function Input({ value, onChange }: Props) {
	const { t } = useTranslation();
	const [isFocused, setIsFocused] = useState(false);

	return (
		<TextInput
			value={value}
			onChangeText={(text) => onChange(text)}
			style={flatten([
				isFocused ? a.bgWhite : a.bgSlate800,
				a.roundedLg,
				a.p4,
				a.textLg,
				a.fontSemiBold,
				a.textBase,
			])}
			placeholder={t("screens.home.searchPlaceholderText")}
			placeholderTextColor={
				isFocused ? a.textSlate950.color : a.textSlate50.color
			}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
		/>
	);
}
