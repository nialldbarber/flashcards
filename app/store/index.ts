import type { ThemeColor } from "#/app/design-system/colors";
import { dummyData } from "#/app/store/data";
import { observable } from "@legendapp/state";
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

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

type State = {
	hapticFeedback: boolean;
	groups: Group[];
};

type Actions = {
	setHapticFeedback: (hapticFeedback: boolean) => void;
	addGroup: (group: GroupDetails) => void;
	removeGroup: (groupId: string) => void;
	addFlashcard: (groupId: string, flashcard: Flashcard) => void;
	removeFlashcard: (groupId: string, flashcardId: string) => void;
	addPreviousScore: (groupId: string, score: number) => void;
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
	addFlashcard: (groupId: string, flashcard: Flashcard) => {
		state$.assign({
			groups: state$.get().groups.map((group) => {
				if (group.id === groupId) {
					return {
						...group,
						flashcards: [...group.flashcards, flashcard],
					};
				}
				return group;
			}),
		});
	},
	removeFlashcard: (groupId: string, flashcardId: string) => {
		state$.assign({
			groups: state$.get().groups.map((group) => {
				if (group.id === groupId) {
					return {
						...group,
						flashcards: group.flashcards.filter(
							(flashcard) => flashcard.id !== flashcardId,
						),
					};
				}
				return group;
			}),
		});
	},
	addPreviousScore: (groupId: string, score: number) => {
		state$.assign({
			groups: state$.get().groups.map((group) => {
				if (group.id === groupId) {
					return {
						...group,
						previousScore: score,
					};
				}
				return group;
			}),
		});
	},
});

persistObservable(state$, {
	local: "persistedState",
	pluginLocal: ObservablePersistMMKV,
});
