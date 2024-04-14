import type { HapticFeedbackTypes } from "react-native-haptic-feedback";
import HapticFeedback from "react-native-haptic-feedback";

import { state$ } from "#/app/store";

export function useHapticFeedback() {
	const hapticFeedback = state$.get().hapticFeedback;

	function invokeHapticFeedback() {
		if (hapticFeedback) {
			HapticFeedback.trigger("impactAsync" as HapticFeedbackTypes);
		}
	}

	return { invokeHapticFeedback };
}
