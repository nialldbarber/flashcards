import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { forwardRef, useMemo, useState } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { colors } from "#/app/design-system/colors";
import { Button } from "#/app/design-system/components/button";
import { inputStylesheet } from "#/app/design-system/components/input";
import { YStack } from "#/app/design-system/components/stacks/y-stack";

type Ref = BottomSheetModal;
type Props = {};

export const CardListModal = forwardRef<Ref, Props>((props, ref) => {
	const { styles } = useStyles(inputStylesheet);
	const { styles: modalStyles } = useStyles(stylesheet);
	const snapPoints = useMemo(() => ["35%", "35%"], []);

	const [isQuestionFocused, setIsQuestionFocused] = useState(false);
	const [isAnswerFocused, setIsAnswerFocused] = useState(false);

	return (
		<BottomSheetModal
			index={1}
			ref={ref}
			keyboardBehavior="fillParent"
			snapPoints={snapPoints}
			backgroundStyle={modalStyles.modalContainer}
			backdropComponent={BottomSheetBackdrop}
		>
			<YStack margin="18px" gutter="11px">
				<BottomSheetTextInput
					style={styles.container(isQuestionFocused)}
					placeholderTextColor="white"
					placeholder="Question"
					onFocus={() => setIsQuestionFocused(true)}
					onBlur={() => setIsQuestionFocused(false)}
				/>
				<BottomSheetTextInput
					style={styles.container(isAnswerFocused)}
					placeholderTextColor="white"
					placeholder="Answer"
					onFocus={() => setIsAnswerFocused(true)}
					onBlur={() => setIsAnswerFocused(false)}
				/>
				<Button>Add</Button>
			</YStack>
		</BottomSheetModal>
	);
});

const stylesheet = createStyleSheet(() => ({
	modalContainer: {
		backgroundColor: colors.black,
	},
}));
