import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { colors } from "#/app/design-system/colors";
import { options } from "#/app/navigation/utils";
import { CardListScreen } from "#/app/screens/card-list";
import { HomeScreen } from "#/app/screens/home-screen";
import { SettingsScreen } from "#/app/screens/settings";

const { Group, Navigator, Screen } =
	createNativeStackNavigator<ReactNavigation.RootParamList>();

export function Navigation() {
	const { styles } = useStyles(stylesheet);

	return (
		<NavigationContainer>
			<Navigator
				initialRouteName="Home"
				screenOptions={{
					contentStyle: styles.home,
				}}
			>
				<Screen
					name="Home"
					component={HomeScreen}
					options={options}
				/>
				<Screen
					name="CardList"
					component={CardListScreen}
					options={options}
				/>
				<Group screenOptions={{ presentation: "modal" }}>
					<Screen
						name="SettingsModal"
						component={SettingsScreen}
						options={{
							...options,
							contentStyle: styles.settingsModal,
						}}
					/>
				</Group>
			</Navigator>
		</NavigationContainer>
	);
}

const stylesheet = createStyleSheet(() => ({
	home: {
		backgroundColor: colors.black,
	},
	settingsModal: {
		backgroundColor: colors.darkBlue,
	},
}));
