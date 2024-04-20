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
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { colors } from "#/app/design-system/colors";
import { Text } from "#/app/design-system/components/text";
import { space } from "#/app/design-system/space";
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
	const { styles } = useStyles(stylesheet);
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
					animatedCard,
					styles.swipeContainer(width, numberOfCards, index),
				])}
			>
				<View style={styles.gradientContainer}>
					<LinearGradient
						colors={["transparent", colors.experimentalBlack]}
						style={styles.gradient}
					/>
					<View style={styles.swipeCardContainer}>
						<Text size="26px" style={styles.swipeCardText}>
							{flashcard.question}
						</Text>
					</View>
				</View>
			</Animated.View>
		</GestureDetector>
	);
}

const stylesheet = createStyleSheet(() => ({
	swipeContainer: (
		width: number,
		numberOfCards: number,
		index: number,
	) => ({
		position: "absolute",
		borderRadius: space["16px"],
		justifyContent: "flex-end",
		aspectRatio: 1 / 1.67,
		width: width * 0.8,
		zIndex: numberOfCards - index,
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	}),
	gradientContainer: {
		backgroundColor: colors.orangeLight,
		borderRadius: space["24px"],
		height: 500,
	},
	gradient: {
		position: "absolute",
		left: space["0px"],
		right: space["0px"],
		bottom: space["0px"],
		borderBottomLeftRadius: space["16px"],
		borderBottomRightRadius: space["16px"],
		top: "50%",
		transform: [{ translateY: -50 }],
	},
	swipeCardContainer: {
		padding: space["12px"],
	},
	swipeCardText: {
		color: colors.white,
	},
}));
