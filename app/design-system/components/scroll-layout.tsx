import type { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { atoms as a } from "#/app/design-system/atoms";
import { f } from "#/app/design-system/utils/flatten";

interface LayoutProps extends PropsWithChildren {
	scrollable?: boolean;
}

export function Layout({ children, scrollable = true }: LayoutProps) {
	const Container = scrollable ? ScrollView : View;
	const style = f([a.flex1, a.px6]);
	const layoutProps = scrollable
		? { contentContainerStyle: style }
		: { style };

	return (
		<Container {...layoutProps}>
			<SafeAreaView>{children}</SafeAreaView>
		</Container>
	);
}
