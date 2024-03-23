import { useNavigation } from "@react-navigation/native";
import { AddCircle, Setting2 } from "iconsax-react-native";
import { useTranslation } from "react-i18next";

import { Pressable } from "#/app/components/core/pressable";
import { atoms as a } from "#/app/design-system/atoms";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Text } from "#/app/design-system/components/text";
import { flatten } from "#/app/design-system/utils/flatten";
import { View } from "react-native";

export function HomeScreen() {
	const { t } = useTranslation();
	const { navigate } = useNavigation();

	return (
		<>
			<Layout>
				<Text level="heading" size="30px" styles={a.textSlate50}>
					{t("app-title")}
				</Text>
				<Pressable
					onPress={() => navigate("SettingsModal")}
					eventName="NAVIGATED_TO_SETTINGS"
					eventProperties={{ from: "HomeScreen" }}
					aria-label={t("screens.home.a11y.goToSettings")}
				>
					<Setting2 size="32" color="#FF8A65" />
				</Pressable>
			</Layout>
			<View>
				<Pressable
					// onPress={() => navigate("SettingsModal")}
					eventName="CREATE_NEW_GROUP"
					aria-label={t("screens.home.a11y.createNewGroup")}
					style={flatten([a.absolute, a.bottom12, a.right8])}
				>
					<AddCircle size="50" color="#FF8A65" />
				</Pressable>
			</View>
		</>
	);
}
