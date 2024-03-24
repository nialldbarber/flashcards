import type { PropsWithChildren } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";

import { useEffectOnce } from "#/app/hooks/useEffectOnce";

type Props = {
	index: number;
};

const DELAY = 200;
const DURATION = 200;

export function List({ index, children }: PropsWithChildren<Props>) {
	const opacity = useSharedValue(0);
	const translateY = useSharedValue(20);

	useEffectOnce(() => {
		opacity.value = withDelay(
			DELAY,
			withTiming(1, { duration: DURATION * (index + 1) }),
		);
		translateY.value = withDelay(
			DELAY,
			withTiming(0, { duration: DURATION * (index + 1) }),
		);
	});

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ translateY: translateY.value }],
	}));

	return (
		<Animated.View style={animatedStyle}>{children}</Animated.View>
	);
}
