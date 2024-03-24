import { AddCircle, Setting2 } from "iconsax-react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Pressable } from "#/app/components/core/pressable";
import { atoms as a } from "#/app/design-system/atoms";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Text } from "#/app/design-system/components/text";
import { flatten } from "#/app/design-system/utils/flatten";

export function HomeScreen() {
	const { t } = useTranslation();

	return (
		<>
			<Layout>
				<View
					style={flatten([
						a.itemsCenter,
						a.justifyAround,
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
						<Setting2 size="32" color="#FF8A65" variant="Bulk" />
					</Pressable>
				</View>
			</Layout>
			<View>
				<Pressable
					// onPress={() => navigate("SettingsModal")}
					eventName="CREATE_NEW_GROUP"
					aria-label={t("screens.home.a11y.createNewGroup")}
					style={flatten([a.absolute, a.bottom12, a.right8])}
				>
					<AddCircle size="50" color="#FF8A65" variant="Bulk" />
				</Pressable>
			</View>
		</>
	);
}
