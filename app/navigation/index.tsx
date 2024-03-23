import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CardListScreen } from "#/app/screens/card-list";
import { HomeScreen } from "#/app/screens/home-screen";
import { SettingsScreen } from "#/app/screens/settings";

const { Group, Navigator, Screen } =
	createNativeStackNavigator<ReactNavigation.RootParamList>();

export function Navigation() {
	return (
		<NavigationContainer>
			<Navigator initialRouteName="Home">
				<Screen name="Home" component={HomeScreen} />
				<Screen name="CardList" component={CardListScreen} />
				<Group screenOptions={{ presentation: "modal" }}>
					<Screen name="SettingsModal" component={SettingsScreen} />
				</Group>
			</Navigator>
		</NavigationContainer>
	);
}
