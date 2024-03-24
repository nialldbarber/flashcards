import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { storeMiddleware } from "#/app/utils/store-middleware";

export type Group = {
	id: string;
	name: string;
	flashcards: Flashcard[];
	emoji: string;
};

export type Flashcard = {
	id: string;
	question: string;
	answer: string;
};

type FlashcardsState = {
	groups: Group[];
	addGroup: (group: Group) => void;
	removeGroup: (groupId: string) => void;
	addFlashcard: (groupId: string, flashcard: Flashcard) => void;
	removeFlashcard: (groupId: string, flashcardId: string) => void;
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
			addGroup: (group: Group) => {
				set((state) => {
					state.groups.push(group);
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
						(group: Group) => group.id === groupId,
					);
					if (group) {
						group.flashcards.push(flashcard);
					}
				});
			},
			removeFlashcard: (groupId: string, flashcardId: string) => {
				set((state) => {
					const group = state.groups.find(
						(group: Group) => group.id === groupId,
					);
					if (group) {
						group.flashcards = group.flashcards.filter(
							(flashcard: Flashcard) => flashcard.id !== flashcardId,
						);
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
