import { View } from "react-native";
import Animated, {
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

import { atoms as a } from "#/app/design-system/atoms";
import { f } from "#/app/design-system/utils/flatten";
import { useEffectOnce } from "#/app/hooks/useEffectOnce";

const TO_VALUE = 360;
const DURATION = 650;

export function Loader() {
	const rotation = useSharedValue(0);
	const rotationStyles = useAnimatedStyle(() => ({
		transform: [
			{
				rotateZ: `${rotation.value}deg`,
			},
		],
	}));

	useEffectOnce(() => {
		rotation.value = withRepeat(
			withTiming(TO_VALUE, {
				duration: DURATION,
			}),
			-1,
		);
		return () => cancelAnimation(rotation);
	});

	return (
		<View
			style={f([a.flex1, a.justifyCenter, a.itemsCenter])}
			accessibilityRole="image"
			aria-label="Loading content"
		>
			<Animated.View
				style={f([a.h8, a.w8, a.roundedFull, rotationStyles])}
			/>
		</View>
	);
}
