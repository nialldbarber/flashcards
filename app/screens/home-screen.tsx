import { View } from "react-native";

import { Text } from "#/app/design-system/components/text";
import { useTranslation } from "#/app/i18n/useTranslation";

export function HomeScreen() {
	const { t } = useTranslation();

	return (
		<View>
			<Text>{t("app-title")}</Text>
		</View>
	);
}
