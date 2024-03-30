import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { atoms as a } from "#/app/design-system/atoms";
import { options } from "#/app/navigation/utils";
import { CardListScreen } from "#/app/screens/card-list";
import { HomeScreen } from "#/app/screens/home-screen";
import { SettingsScreen } from "#/app/screens/settings";

const { Group, Navigator, Screen } =
	createNativeStackNavigator<ReactNavigation.RootParamList>();

export function Navigation() {
	return (
		<NavigationContainer>
			<Navigator
				initialRouteName="Home"
				screenOptions={{
					contentStyle: a.bgSlate950,
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
						options={{ ...options, contentStyle: a.bgDarkBlue }}
					/>
				</Group>
			</Navigator>
		</NavigationContainer>
	);
}
