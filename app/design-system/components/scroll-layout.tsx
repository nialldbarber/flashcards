import type { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { space } from "#/app/design-system/space";

interface LayoutProps extends PropsWithChildren {
	scrollable?: boolean;
}

export function Layout({ children, scrollable = true }: LayoutProps) {
	const Container = scrollable ? ScrollView : View;
	const { styles } = useStyles(stylesheet);

	const layoutProps = scrollable
		? { contentContainerStyle: styles.container }
		: { style: styles.container };

	return (
		<Container {...layoutProps}>
			<SafeAreaView>{children}</SafeAreaView>
		</Container>
	);
}

const stylesheet = createStyleSheet(() => ({
	container: {
		flex: 1,
		paddingHorizontal: space["24px"],
	},
}));
