import { AddCircle, Setting2 } from "iconsax-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextInput, View } from "react-native";

import { Pressable } from "#/app/components/core/pressable";
import { atoms as a } from "#/app/design-system/atoms";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Text } from "#/app/design-system/components/text";
import { flatten } from "#/app/design-system/utils/flatten";
import { DebugLayout } from "#/app/utils/debug-layout";

export function HomeScreen() {
	const { t } = useTranslation();

	const [isFocused, setIsFocused] = useState(false);

	return (
		<>
			<Layout>
				<DebugLayout>
					<View
						style={flatten([
							a.itemsStart,
							a.justifyBetween,
							a.flexRow,
							a.my5,
						])}
					>
						<Text level="heading" size="30px" styles={a.textSlate50}>
							{t("app-title")}
						</Text>
						<Pressable
							routeName="SettingsModal"
							eventName="NAVIGATED_TO_SETTINGS"
							eventProperties={{ from: "HomeScreen" }}
							aria-label={t("screens.home.a11y.goToSettings")}
						>
							<Setting2 size="40" color="#FF8A65" variant="Bulk" />
						</Pressable>
					</View>

					<View style={flatten([a.mt4])}>
						<TextInput
							style={flatten([
								isFocused ? a.bgWhite : a.bgSlate800,
								a.roundedLg,
								a.h12,
								a.p4,
								a.textLg,
							])}
							placeholder={t("screens.home.searchPlaceholderText")}
							placeholderTextColor={
								isFocused ? a.textSlate950.color : a.textSlate50.color
							}
							onFocus={() => {
								setIsFocused(true);
							}}
							onBlur={() => {
								setIsFocused(false);
							}}
						/>
					</View>
				</DebugLayout>
			</Layout>
			<View>
				<Pressable
					eventName="CREATE_NEW_GROUP"
					aria-label={t("screens.home.a11y.createNewGroup")}
					style={flatten([a.absolute, a.bottom12, a.right8])}
				>
					<AddCircle size="70" color="#FF8A65" variant="Bulk" />
				</Pressable>
			</View>
		</>
	);
}
