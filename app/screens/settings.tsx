import { CloseCircle } from "iconsax-react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Pressable } from "#/app/components/core/pressable";
import { atoms as a } from "#/app/design-system/atoms";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Text } from "#/app/design-system/components/text";
import { flatten } from "#/app/design-system/utils/flatten";
import { useLanguage } from "../hooks/useLanguage";

export function SettingsScreen() {
	const { t } = useTranslation();
	const { changeLanguage } = useLanguage();

	return (
		<Layout>
			<View
				style={flatten([
					a.itemsCenter,
					a.justifyBetween,
					a.flexRow,
					a.my5,
				])}
			>
				<Text
					level="heading"
					size="30px"
					styles={flatten([a.textSlate50])}
				>
					{t("screens.settings.header")}
				</Text>
				<Pressable
					routeName="Home"
					aria-label={t("screens.settings.a11y.backToHome")}
				>
					<CloseCircle size="32" color="#FF8A65" variant="Bulk" />
				</Pressable>
			</View>

			<Pressable onPress={() => changeLanguage("en")}>
				<Text level="heading" size="44px">
					🇬🇧
				</Text>
			</Pressable>
			<Pressable onPress={() => changeLanguage("lv")}>
				<Text level="heading" size="44px">
					🇱🇻
				</Text>
			</Pressable>
		</Layout>
	);
}
