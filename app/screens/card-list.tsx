import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ArrowLeft } from "iconsax-react-native";
import { produce } from "immer";
import { useEffect, useReducer } from "react";
import { View } from "react-native";

import { Pressable } from "#/app/components/core/pressable";
import { atoms as a } from "#/app/design-system/atoms";
import { Button } from "#/app/design-system/components/button";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Spacer } from "#/app/design-system/components/spacer";
import { Text } from "#/app/design-system/components/text";
import { flatten } from "#/app/design-system/utils/flatten";
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
				draft.gameEnded = true; // Ensure this only triggers at the true end
			}
			break;
		case END_GAME:
			draft.gameStarted = false;
			break;
		// Add any additional cases here
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

	const initialState = {
		gameStarted: false,
		gameEnded: false,
		currentCardIndex: 0,
		score: 0,
		cards: flashcards,
	};

	const [state, dispatch] = useReducer(
		flashcardGameReducer,
		initialState,
	);

	const startGame = () => dispatch({ type: START_GAME });
	const answerCard = (correct: boolean) =>
		dispatch({ type: ANSWER_CARD, correct });
	const endGame = () => dispatch({ type: END_GAME });

	const currentCard = flashcards[state.currentCardIndex];

	useEffect(() => {
		dispatch({ type: SET_CARDS, cards: flashcards });
	}, [flashcards]);

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
					<View>
						{state.gameStarted && !state.gameEnded && (
							<Text
								onPress={() => {
									/* Handle flip card or show answer */
								}}
							>
								{currentCard.question}
							</Text>
						)}
					</View>
				)}
			</Layout>
			<View style={flatten([a.px6, a.pt5, a.pb10])}>
				{flashcardsInDeck && !state.gameStarted ? (
					<Button onPress={startGame}>Start</Button>
				) : null}
				<Spacer size="16px" />
				{!state.gameStarted ? (
					<Button variant="secondary">Add</Button>
				) : null}
				{state.gameStarted && !state.gameEnded && (
					<>
						<Button onPress={() => answerCard(true)}>Correct</Button>
						<Spacer size="16px" />
						<Button
							variant="secondary"
							onPress={() => answerCard(false)}
						>
							Incorrect
						</Button>
					</>
				)}

				{state.gameEnded && (
					<>
						<Text>
							Your score: {state.score}/{state.cards.length}
						</Text>
						<Button onPress={startGame}>Restart Game</Button>
					</>
				)}
			</View>
		</>
	);
}
