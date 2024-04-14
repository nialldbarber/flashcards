import { View, useWindowDimensions } from "react-native";
import {
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

import { atoms as a } from "#/app/design-system/atoms";
import { Text } from "#/app/design-system/components/text";
import { f } from "#/app/design-system/utils/flatten";
import type { Flashcard } from "#/app/store";

export type SwipeCardProps = {
	flashcard: Flashcard;
	numberOfCards: number;
	index: number;
	activeIndex: SharedValue<number>;
	onResponse: (active: boolean) => void;
};

export function SwipeCard({
	flashcard,
	numberOfCards,
	index,
	activeIndex,
	onResponse,
}: SwipeCardProps) {
	const { width, height } = useWindowDimensions();
	const translationX = useSharedValue(0);

	const animatedCard = useAnimatedStyle(() => {
		const isActive = activeIndex.value === index;
		return {
			opacity: isActive ? 1 : 0,
			transform: [
				{
					scale: interpolate(
						activeIndex.value,
						[index - 1, index, index + 1],
						[0.95, 1, 1],
					),
				},
				{
					translateY: interpolate(
						activeIndex.value,
						[index - 1, index, index + 1],
						[-30, 0, 0],
					),
				},
				{
					translateX: translationX.value,
				},
				{
					rotateZ: `${interpolate(
						translationX.value,
						[-width / 2, 0, width / 2],
						[-15, 0, 15],
					)}deg`,
				},
			],
			height: isActive ? height : 0,
		};
	});

	const gesture = Gesture.Pan()
		.onChange((event) => {
			translationX.value = event.translationX;
		})
		.onEnd((event) => {
			if (Math.abs(event.velocityX) > 400) {
				const nextIndex = index + (event.velocityX > 0 ? 1 : -1);
				activeIndex.value = withSpring(
					nextIndex >= 0 ? nextIndex : 0,
				);

				runOnJS(onResponse)(event.velocityX > 0);
			} else {
				translationX.value = withSpring(0);
			}
		});

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View
				style={f([
					a.absolute,
					a.rounded2xl,
					a.justifyEnd,
					animatedCard,
					{
						aspectRatio: 1 / 1.67,
						width: width * 0.8, // Maintain width as before
						zIndex: numberOfCards - index,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.22,
						shadowRadius: 2.22,
						elevation: 3,
					},
				])}
			>
				<View style={f([a.bgBlue300, a.rounded3xl, { height: 500 }])}>
					<LinearGradient
						colors={["transparent", "rgba(0,0,0,0.8)"]}
						style={f([
							a.fillSpace,
							a.roundedB2xl,
							{ top: "50%", transform: [{ translateY: -50 }] },
						])}
					/>
					<View style={f([a.p3])}>
						<Text style={f([a.text2xl, a.textWhite])}>
							{flashcard.question}
						</Text>
					</View>
				</View>
			</Animated.View>
		</GestureDetector>
	);
}
