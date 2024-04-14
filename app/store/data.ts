import { themeColors } from "#/app/design-system/colors";
import type { Group } from "#/app/store";

export const dummyData: Group[] = [
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
		themeColor: themeColors[0],
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
		themeColor: themeColors[1],
	},
];
