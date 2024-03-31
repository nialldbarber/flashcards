import HapticFeedback, {
	type HapticFeedbackTypes,
} from "react-native-haptic-feedback";

import { usePreferencesStore } from "#/app/store/preferences";

export function useHapticFeedback() {
	const { hapticFeedback } = usePreferencesStore();

	function invokeHapticFeedback() {
		if (hapticFeedback) {
			HapticFeedback.trigger("impactAsync" as HapticFeedbackTypes);
		}
	}

	return { invokeHapticFeedback };
}
