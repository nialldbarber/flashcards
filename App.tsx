import type React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { atoms as a } from "#/app/design-system/atoms";
import { Navigation } from "#/app/navigation";

function App() {
	return (
		<GestureHandlerRootView style={a.flex1}>
			<Navigation />
		</GestureHandlerRootView>
	);
}

export default App;
