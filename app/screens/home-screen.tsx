import { Text, View } from "react-native";

import { useTranslation } from "#/app/i18n/useTranslation";

export function HomeScreen() {
	const { t } = useTranslation();

	return (
		<View>
			<Text>{t("app-title")}</Text>
		</View>
	);
}
