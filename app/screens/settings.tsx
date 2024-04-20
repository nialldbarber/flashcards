import { CloseCircle } from "iconsax-react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Pressable } from "#/app/components/core/pressable";
import { colors } from "#/app/design-system/colors";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Text } from "#/app/design-system/components/text";
import { space } from "#/app/design-system/space";
import { useLanguage } from "#/app/hooks/useLanguage";
import { storage } from "#/app/utils/mmkv";

export function SettingsScreen() {
	const { t } = useTranslation();
	const { changeLanguage } = useLanguage();
	const { styles } = useStyles(stylesheet);

	return (
		<Layout>
			<View style={styles.container}>
				<Text
					level="heading"
					size="30px"
					overideStyles={styles.header}
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
			{__DEV__ && (
				<Pressable
					onPress={() => storage.clearAll()}
					accessibilityLabel="purge all keys"
				>
					<Text>Purge all data</Text>
				</Pressable>
			)}
		</Layout>
	);
}

const stylesheet = createStyleSheet(() => ({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: space["5px"],
	},
	header: {
		color: colors.greyOne,
	},
}));
