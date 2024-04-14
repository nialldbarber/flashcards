import type { ModalScreenProps } from "@react-navigation/modal";
import type { NavigatorScreenParams } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";

import type { Flashcard } from "#/app/store";

export type RootStackParamList = {
	Home: undefined;
	CardList: {
		name: string;
		emoji: string;
		flashcards: Flashcard[];
	};
	SettingsModal:
		| NavigatorScreenParams<SettingsModalParamList>
		| undefined;
};
export type RootStackRouteNames = keyof RootStackParamList;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
	StackScreenProps<RootStackParamList, T>;

export type SettingsModalParamList = {};

export type SettingsModalScreenProps<
	T extends keyof SettingsModalParamList,
> = ModalScreenProps<SettingsModalParamList, T>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
