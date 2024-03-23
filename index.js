import "intl-pluralrules";
import { AppRegistry } from "react-native";

import App from "./App";
import { name as appName } from "./app.json";
import "./app/i18n";
import "./app/services/mixpanel";

AppRegistry.registerComponent(appName, () => App);
