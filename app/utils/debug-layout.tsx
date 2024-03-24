import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export function DebugLayout({ children }: PropsWithChildren) {
	return (
		<View>
			<View pointerEvents="none" style={styles.container} />
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(255, 0, 0, 0.1)",
		borderColor: "red",
		borderWidth: 1,
	},
});
