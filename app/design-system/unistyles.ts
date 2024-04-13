import { UnistylesRegistry } from "react-native-unistyles";

import {
	darkTheme,
	lightTheme,
} from "#/app/design-system/design-tokens";

UnistylesRegistry.addThemes({
	dark: darkTheme,
	light: lightTheme,
}).addConfig({
	adaptiveThemes: true,
});
