import type React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import "#/app/design-system/unistyles";
import { Navigation } from "#/app/navigation";
import "#/app/store";

export default function App() {
	const { styles } = useStyles(stylesheet);

	return (
		<GestureHandlerRootView style={styles.container}>
			<Navigation />
		</GestureHandlerRootView>
	);
}

const stylesheet = createStyleSheet(() => ({
	container: {
		flex: 1,
	},
}));
