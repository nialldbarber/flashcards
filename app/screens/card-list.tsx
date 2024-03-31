import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ArrowLeft } from "iconsax-react-native";
import { produce } from "immer";
import { useEffect, useReducer, useState } from "react";
import { View } from "react-native";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

import { Pressable } from "#/app/components/core/pressable";
import { atoms as a } from "#/app/design-system/atoms";
import { Button } from "#/app/design-system/components/button";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Spacer } from "#/app/design-system/components/spacer";
import { Text } from "#/app/design-system/components/text";
import { flatten } from "#/app/design-system/utils/flatten";
import { useEffectIgnoreDeps } from "#/app/hooks/useEffectIgnoreDeps";
import type { RootStackParamList } from "#/app/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "CardList">;

const SET_CARDS = "SET_CARDS";
const START_GAME = "START_GAME";
const ANSWER_CARD = "ANSWER_CARD";
const END_GAME = "END_GAME";

const flashcardGameReducer = produce((draft, action) => {
	switch (action.type) {
		case SET_CARDS:
			draft.cards = action.cards;
			break;
		case START_GAME:
			draft.gameStarted = true;
			draft.currentCardIndex = 0;
			draft.score = 0;
			draft.gameEnded = false;
			break;
		case ANSWER_CARD:
			draft.score += action.correct ? 1 : 0;
			if (draft.currentCardIndex < draft.cards.length - 1) {
				draft.currentCardIndex += 1;
			} else {
				draft.gameEnded = true;
			}
			break;
		case END_GAME:
			draft.gameStarted = false;
			break;
	}
});

export function CardListScreen({
	route: {
		params: { name, emoji, flashcards },
	},
}: Props) {
	const { navigate } = useNavigation();
	const noFlashcards = flashcards.length === 0;
	const flashcardsInDeck = flashcards.length;

	const [isFlipped, setIsFlipped] = useState(false);

	const rotateY = useSharedValue(0);
	const gameVisibility = useSharedValue(0);

	const frontAnimatedStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			rotateY.value,
			[0, 90],
			[1, 0],
			Extrapolation.CLAMP,
		);
		return {
			transform: [{ rotateY: `${rotateY.value}deg` }],
			opacity,
		};
	});

	const backAnimatedStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			rotateY.value,
			[90, 180],
			[0, 1],
			Extrapolation.CLAMP,
		);
		return {
			transform: [{ rotateY: `${rotateY.value + 180}deg` }],
			opacity,
		};
	});

	const gameVisibilityStyles = useAnimatedStyle(() => ({
		opacity: gameVisibility.value,
	}));

	function flipCard() {
		setIsFlipped(!isFlipped);
		rotateY.value = withSpring(isFlipped ? 0 : 180);
	}

	function answerAndFlipCard(correct: boolean) {
		answerCard(correct);
		if (isFlipped) {
			flipCard();
		}
	}

	const initialState = {
		gameStarted: false,
		gameEnded: false,
		currentCardIndex: 0,
		score: 0,
		cards: flashcards,
	};

	const [
		{ gameStarted, gameEnded, currentCardIndex, score, cards },
		dispatch,
	] = useReducer(flashcardGameReducer, initialState);

	const startGame = () => dispatch({ type: START_GAME });
	const answerCard = (correct: boolean) =>
		dispatch({ type: ANSWER_CARD, correct });
	const endGame = () => dispatch({ type: END_GAME });

	const currentCard = flashcards[currentCardIndex];

	useEffect(() => {
		dispatch({ type: SET_CARDS, cards: flashcards });
	}, [flashcards]);

	useEffectIgnoreDeps(() => {
		if (gameStarted) {
			gameVisibility.value = withTiming(1, { duration: 200 });
		} else {
			gameVisibility.value = withTiming(0, { duration: 200 });
		}
	}, [gameStarted]);

	const cardStyles = [
		a.absolute,
		a.top0,
		a.left0,
		a.right0,
		a.bottom28,
		a.flex,
		a.itemsCenter,
		a.justifyCenter,
	];

	return (
		<>
			<Layout>
				<Pressable onPress={() => navigate("Home")}>
					<ArrowLeft size={40} variant="Bulk" color="#FF8A65" />
				</Pressable>
				<View style={flatten([a.itemsCenter])}>
					<Text level="heading" size="30px" withEmoji>
						{name} {emoji}
					</Text>
				</View>
				{noFlashcards ? (
					<View
						style={flatten([
							a.bgBlue500,
							a.hFull,
							a.itemsCenter,
							a.justifyCenter,
						])}
					>
						<Text>You have no flashcards</Text>
					</View>
				) : (
					gameStarted &&
					!gameEnded && (
						<Animated.View
							style={[
								gameVisibilityStyles,
								flatten([
									a.relative,
									a.wFull,
									a.hFull,
									a.my7,
									a.itemsCenter,
									a.justifyCenter,
									a.p5,
								]),
							]}
						>
							<Pressable
								onPress={flipCard}
								style={flatten([...cardStyles])}
							>
								<Animated.View
									style={[
										flatten([
											...cardStyles,
											a.bgOrangeFaded,
											a.roundedXl,
										]),
										frontAnimatedStyle,
									]}
								>
									<Text style={flatten([a.textWhite, a.textCenter])}>
										{currentCard.question}
									</Text>
								</Animated.View>
								<Animated.View
									style={[
										flatten([
											...cardStyles,
											a.bgSlate800,
											a.roundedXl,
										]),
										backAnimatedStyle,
									]}
								>
									<Text style={flatten([a.textWhite, a.textCenter])}>
										{currentCard.answer}
									</Text>
								</Animated.View>
							</Pressable>
						</Animated.View>
					)
				)}
			</Layout>
			<View style={flatten([a.px6, a.pt5, a.pb10])}>
				{flashcardsInDeck && !gameStarted ? (
					<Button onPress={startGame}>Start</Button>
				) : null}
				<Spacer size="16px" />
				{!gameStarted ? (
					<Button variant="secondary">Add</Button>
				) : null}
				{gameStarted && !gameEnded && (
					<>
						<Button onPress={() => answerAndFlipCard(true)}>
							<Text withEmoji>Correct ✅</Text>
						</Button>
						<Spacer size="16px" />
						<Button
							variant="secondary"
							onPress={() => answerAndFlipCard(false)}
						>
							<Text withEmoji>Incorrect ❌</Text>
						</Button>
					</>
				)}
				{gameEnded && (
					<>
						<Text>
							Your score: {score}/{cards.length}
						</Text>
						<Button onPress={startGame}>Replay?</Button>
					</>
				)}
			</View>
		</>
	);
}

// TODO: kill home menu when routing away?
