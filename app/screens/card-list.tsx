import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Layout } from "#/app/design-system/components/scroll-layout";
import { Text } from "#/app/design-system/components/text";
import type { RootStackParamList } from "#/app/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "CardList">;

export function CardListScreen({
	route: {
		params: { name, emoji, flashcards },
	},
}: Props) {
	return (
		<Layout>
			<Text level="heading" size="30px" withEmoji>
				{name} {emoji}
			</Text>
			<Text>{JSON.stringify(flashcards, null, 2)}</Text>
		</Layout>
	);
}
