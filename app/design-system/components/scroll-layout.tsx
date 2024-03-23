import type { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { atoms as a } from "#/app/design-system/atoms";
import { flatten } from "#/app/design-system/utils/flatten";

interface LayoutProps extends PropsWithChildren {
	scrollable?: boolean;
}

export function Layout({ children, scrollable = true }: LayoutProps) {
	const Container = scrollable ? ScrollView : View;
	const style = flatten([a.flex1, a.px5]);
	const layoutProps = scrollable
		? { contentContainerStyle: style }
		: { style };

	return (
		<Container {...layoutProps}>
			<SafeAreaView>{children}</SafeAreaView>
		</Container>
	);
}
