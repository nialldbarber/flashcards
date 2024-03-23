import { Layout } from "#/app/design-system/components/scroll-layout";
import { Text } from "#/app/design-system/components/text";
import { useTranslation } from "#/app/i18n/useTranslation";

export function HomeScreen() {
	const { t } = useTranslation();

	return (
		<Layout>
			<Text size="20px">{t("app-title")}</Text>
		</Layout>
	);
}
