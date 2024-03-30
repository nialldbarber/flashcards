import { View } from "react-native";

import type { Space } from "#/app/design-system/space";
import { space } from "#/app/design-system/space";

export type SpacerProps = {
	direction?: "horizontal" | "vertical";
	size: Space;
};

export function Spacer({
	direction = "vertical",
	size,
}: SpacerProps) {
	const styles =
		direction === "vertical"
			? { height: space[size] }
			: { width: space[size] };

	return <View style={styles} />;
}
