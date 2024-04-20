import { View } from "react-native";
import Animated, {
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { radii } from "#/app/design-system/radii";
import { space } from "#/app/design-system/space";
import { f } from "#/app/design-system/utils/flatten";
import { useEffectOnce } from "#/app/hooks/useEffectOnce";

const TO_VALUE = 360;
const DURATION = 650;

export function Loader() {
	const { styles } = useStyles(stylesheet);
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
			style={styles.container}
			accessibilityRole="image"
			aria-label="Loading content"
		>
			<Animated.View style={f([styles.loader, rotationStyles])} />
		</View>
	);
}

const stylesheet = createStyleSheet(() => ({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loader: {
		height: space["8px"],
		width: space["8px"],
		borderRadius: radii.full,
	},
}));
