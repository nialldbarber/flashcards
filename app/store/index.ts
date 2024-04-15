import { observable } from "@legendapp/state";
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

import type { ThemeColor } from "#/app/design-system/colors";
import { dummyData } from "#/app/store/data";

enableReactComponents();

type GroupDetails = Pick<
	Group,
	"id" | "name" | "emoji" | "themeColor"
>;

export type Group = {
	id: string;
	name: string;
	flashcards?: Flashcard[];
	emoji: string;
	previousScore?: number;
	themeColor: ThemeColor;
};

export type Flashcard = {
	id: string;
	question: string;
	answer: string;
};

export type Game = {
	gameStarted: boolean;
	gameEnded: boolean;
	currentCardIndex: number;
	score: number;
	cards: Flashcard[];
};

type State = {
	/**
	 * Haptics
	 */
	hapticFeedback: boolean;
	/**
	 * Flashcards
	 */
	groups: Group[];
	/**
	 * Game
	 */
	game: Game;
};

type Actions = {
	/**
	 * Haptics
	 */
	setHapticFeedback: (hapticFeedback: boolean) => void;
	/**
	 * Flashcards
	 */
	addGroup: (group: GroupDetails) => void;
	removeGroup: (groupId: string) => void;
	/**
	 * Game
	 */
	setCards: (cards: Flashcard[]) => void;
	startGame: () => void;
	answerCard: (correct: boolean) => void;
	endGame: () => void;
};

type Store = State & Actions;

export const state$ = observable<Store>({
	/**
	 * Haptics
	 */
	hapticFeedback: true,
	setHapticFeedback: (hapticFeedback: boolean) => {
		state$.assign({ hapticFeedback });
	},
	/**
	 * Flashcards
	 */
	groups: dummyData,
	addGroup: (group: GroupDetails) => {
		const newGroup = {
			...group,
			flashcards: [],
		};
		state$.assign({
			groups: [...state$.get().groups, newGroup],
		});
	},
	removeGroup: (groupId: string) => {
		state$.assign({
			groups: state$
				.get()
				.groups.filter((group: Group) => group.id !== groupId),
		});
	},
	/**
	 * Game
	 */
	game: {
		gameStarted: false,
		gameEnded: false,
		currentCardIndex: 0,
		score: 0,
		cards: [],
	},
	setCards: (cards: Flashcard[]) => {
		state$.assign({
			game: {
				...state$.get().game,
				cards,
			},
		});
	},
});

persistObservable(state$, {
	local: "persistedState",
	pluginLocal: ObservablePersistMMKV,
});
