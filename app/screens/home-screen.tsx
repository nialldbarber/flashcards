import { useNavigation } from "@react-navigation/native";

import { Pressable } from "#/app/components/core/pressable";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Text } from "#/app/design-system/components/text";
import { useTranslation } from "#/app/i18n/useTranslation";

export function HomeScreen() {
	const { t } = useTranslation();
	const { navigate } = useNavigation();

	return (
		<Layout>
			<Text size="20px">{t("app-title")}</Text>
			<Pressable onPress={() => navigate("SettingsModal")}>
				<Text>Go to Settings</Text>
			</Pressable>
		</Layout>
	);
}
