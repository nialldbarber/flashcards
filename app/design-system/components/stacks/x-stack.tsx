import type { PropsWithChildren } from "react";

import type { StackProps } from "#/app/design-system/components/stacks";
import { Stack } from "#/app/design-system/components/stacks";

export function XStack(
	props: PropsWithChildren<
		Omit<StackProps, "direction" | "paddingDirection">
	>,
) {
	return (
		<Stack {...props} direction="row" paddingDirection="horizontal" />
	);
}
