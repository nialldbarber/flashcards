import { Stack } from "#/app/design-system/components/stacks";
import type { PropsWithChildren } from "react";

import type { StackProps } from "#/app/design-system/components/stacks";

export function YStack(
	props: PropsWithChildren<
		Omit<StackProps, "direction" | "paddingDirection">
	>,
) {
	return (
		<Stack
			{...props}
			direction="column"
			paddingDirection="vertical"
		/>
	);
}
