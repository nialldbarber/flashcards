import { useState } from "react";
import {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

export type ButtonAnimationType = "standard" | "spin";

export function useButtonAnimation(
	animationType: ButtonAnimationType,
) {
	const [isActive, setIsActive] = useState(false);
	const size = useSharedValue(1);
	const rotation = useSharedValue(0);

	const rotationStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: size.value }],
	}));

	function onPressInOut(direction: "in" | "out") {
		size.value = withSpring(direction === "in" ? 0.95 : 1, {
			overshootClamping: false,
			restDisplacementThreshold: 0.01,
			restSpeedThreshold: 2,
		});
	}

	function onPressSpin() {
		if (animationType === "standard") return;
		setIsActive(!isActive);
		rotation.value = withSpring(isActive ? 0 : -40, {
			damping: 10,
			stiffness: 100,
		});
	}

	const style =
		animationType === "spin" ? rotationStyle : animatedStyle;

	return { onPressInOut, onPressSpin, style };
}
