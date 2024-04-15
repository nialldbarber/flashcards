import {
	BottomSheetModalProvider,
	type BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ArrowLeft } from "iconsax-react-native";
import { produce } from "immer";
import {
	useCallback,
	useEffect,
	useReducer,
	useRef,
	useState,
} from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Pressable } from "#/app/components/core/pressable";
import { colors } from "#/app/design-system/colors";
import {
	Button,
	type Variant,
} from "#/app/design-system/components/button";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Spacer } from "#/app/design-system/components/spacer";
import { Text } from "#/app/design-system/components/text";
import { radii } from "#/app/design-system/radii";
import { space } from "#/app/design-system/space";
import { useEffectIgnoreDeps } from "#/app/hooks/useEffectIgnoreDeps";
import type { RootStackParamList } from "#/app/navigation/types";
import { CardListModal } from "#/app/screens/card-list.modal";

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
	const { t } = useTranslation();
	const { styles } = useStyles(stylesheet);

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

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

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

	return (
		<BottomSheetModalProvider>
			<Layout>
				<Pressable
					accessibilityLabel={t(
						"screens.card-list.a11y.goToHomeScreen",
					)}
					onPress={() => navigate("Home")}
				>
					<ArrowLeft size={40} variant="Bulk" color="#FF8A65" />
				</Pressable>
				<View style={styles.heading}>
					<Text level="heading" size="30px" withEmoji>
						{name} {emoji}
					</Text>
				</View>
				{noFlashcards ? (
					<View style={styles.noFlashcards}>
						<Text>{t("screens.card-list.noFlashcards")}</Text>
					</View>
				) : (
					gameStarted &&
					!gameEnded && (
						<Animated.View
							style={[gameVisibilityStyles, styles.gameVisibility]}
						>
							<Pressable
								accessibilityLabel={t(
									"screens.card-list.a11y.flashcard",
								)}
								onPress={flipCard}
								style={styles.card}
							>
								<Animated.View
									style={[
										styles.card,
										styles.controlButton("primary"),
										frontAnimatedStyle,
									]}
								>
									<Text style={styles.controlButtonText}>
										{currentCard.question}
									</Text>
								</Animated.View>
								<Animated.View
									style={[
										styles.card,
										styles.controlButton("secondary"),
										backAnimatedStyle,
									]}
								>
									<Text style={styles.controlButtonText}>
										{currentCard.answer}
									</Text>
								</Animated.View>
							</Pressable>
						</Animated.View>
					)
				)}
			</Layout>
			<View style={styles.controlContainer}>
				{flashcardsInDeck && !gameStarted ? (
					<Button
						accessibilityLabel={t(
							"screens.card-list.a11y.startExercise",
						)}
						onPress={startGame}
					>
						{t("screens.card-list.control.start")}
					</Button>
				) : null}
				<Spacer size="16px" />
				{!gameStarted ? (
					<Button
						accessibilityLabel={t(
							"screens.card-list.a11y.addFlashcard",
						)}
						variant="secondary"
						onPress={handlePresentModalPress}
					>
						{t("screens.card-list.control.add")}
					</Button>
				) : null}
				{gameStarted && !gameEnded && (
					<>
						<Button
							accessibilityLabel={t("screens.card-list.a11y.correct")}
							onPress={() => answerAndFlipCard(true)}
						>
							<Text withEmoji>
								{t("screens.card-list.control.correct")}
							</Text>
						</Button>
						<Spacer size="16px" />
						<Button
							accessibilityLabel={t(
								"screens.card-list.a11y.incorrect",
							)}
							variant="secondary"
							onPress={() => answerAndFlipCard(false)}
						>
							<Text withEmoji>
								{t("screens.card-list.control.incorrect")}
							</Text>
						</Button>
					</>
				)}
				{gameEnded && (
					<>
						<Text>
							{t("screens.card-list.score.finalScore", {
								score,
								flashcardCount: cards.length,
							})}
						</Text>
						<Button
							accessibilityLabel={t(
								"screens.card-list.a11y.replayExercise",
							)}
							onPress={startGame}
						>
							{t("screens.card-list.score.replay")}
						</Button>
					</>
				)}
			</View>
			<CardListModal ref={bottomSheetModalRef} />
		</BottomSheetModalProvider>
	);
}

const stylesheet = createStyleSheet(() => ({
	heading: {
		alignItems: "center",
	},
	noFlashcards: {
		backgroundColor: colors.orangeLight,
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: space["0px"],
		left: space["0px"],
		right: space["0px"],
		bottom: space["115px"],
	},
	gameVisibility: {
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		marginVertical: space["28px"],
		padding: space["20px"],
	},
	controlContainer: {
		paddingHorizontal: space["24px"],
		paddingTop: space["20px"],
		paddingBottom: space["42px"],
	},
	controlButton: (variant?: Variant) => ({
		borderRadius: radii.large,
		backgroundColor:
			variant === "primary" ? colors.orange : colors.greyTwo,
	}),
	controlButtonText: {
		color: colors.white,
		textAlign: "center",
	},
}));
