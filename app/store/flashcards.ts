import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { storeMiddleware } from "#/app/utils/store-middleware";

type GroupDetails = Pick<Group, "id" | "name" | "emoji">;

export type Group = {
	id: string;
	name: string;
	flashcards?: Flashcard[];
	emoji: string;
	previousScore?: number;
};

export type Flashcard = {
	id: string;
	question: string;
	answer: string;
};

type FlashcardsState = {
	groups: Group[];
	addGroup: (group: GroupDetails) => void;
	removeGroup: (groupId: string) => void;
	addFlashcard: (groupId: string, flashcard: Flashcard) => void;
	removeFlashcard: (groupId: string, flashcardId: string) => void;
	addPreviousScore: (groupId: string, score: number) => void;
};

const dummyData: Group[] = [
	{
		id: "1",
		name: "JavaScript",
		emoji: "🚀",
		flashcards: [
			{
				id: "1",
				question: "What is JavaScript?",
				answer: "JavaScript is a programming language.",
			},
			{
				id: "2",
				question: "What is a variable?",
				answer: "A variable is a container for a value.",
			},
		],
	},
	{
		id: "2",
		name: "TypeScript",
		emoji: "🦄",
		flashcards: [
			{
				id: "1",
				question: "What is TypeScript?",
				answer: "TypeScript is a superset of JavaScript.",
			},
			{
				id: "2",
				question: "What is a type?",
				answer: "A type is a set of values.",
			},
		],
	},
];

export const useFlashcardsStore = create(
	persist(
		immer<FlashcardsState>((set) => ({
			groups: dummyData,
			addGroup: (group: GroupDetails) => {
				set((state) => {
					const newGroup = {
						...group,
						flashcards: [],
					};
					state.groups.push(newGroup);
				});
			},
			removeGroup: (groupId: string) => {
				set((state) => {
					state.groups = state.groups.filter(
						(group: Group) => group.id !== groupId,
					);
				});
			},
			addFlashcard: (groupId: string, flashcard: Flashcard) => {
				set((state) => {
					const group = state.groups.find(
						(group: GroupDetails) => group.id === groupId,
					);
					if (group) {
						group?.flashcards.push(flashcard);
					}
				});
			},
			removeFlashcard: (groupId: string, flashcardId: string) => {
				set((state) => {
					const group = state.groups.find(
						(group: GroupDetails) => group.id === groupId,
					);
					if (group) {
						if (group.flashcards) {
							group.flashcards = group.flashcards.filter(
								(flashcard: Flashcard) =>
									flashcard.id !== flashcardId,
							);
						}
					}
				});
			},
			addPreviousScore: (groupId: string, score: number) => {
				set((state) => {
					const group = state.groups.find(
						(group: GroupDetails) => group.id === groupId,
					);
					if (group) {
						group.previousScore = score;
					}
				});
			},
		})),
		{
			name: "flashcards_state",
			storage: createJSONStorage(() => storeMiddleware),
		},
	),
);
