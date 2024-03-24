import { useNavigation } from "@react-navigation/native";
import type {
	GestureResponderEvent,
	PressableProps as NativePressableProps,
} from "react-native";
import { Pressable as NativePressable, Platform } from "react-native";
import HapticFeedback, {
	type HapticFeedbackTypes,
} from "react-native-haptic-feedback";

import { useLanguage } from "#/app/hooks/useLanguage";
import type { RootStackRouteNames } from "#/app/navigation/types";
import { mixpanelTrack } from "#/app/services/mixpanel";
import { usePreferencesStore } from "#/app/store/preferences";
import type { TrackingEvents } from "#/app/tracking/events";

export interface PressableProps extends NativePressableProps {
	/**
	 * Function to be called when the Pressable
	 * is pressed added optionally here from
	 * `PressableProps`, to make the parameters
	 * optional if we want to just trigger
	 * a haptic and no onPress event
	 */
	onPress?:
		| null
		| ((event?: GestureResponderEvent) => void)
		| undefined;
	/**
	 * Use this when the Pressable doesn't
	 * fire a function, but still requires
	 * feedback
	 */
	forceHaptic?: boolean;
	eventName?: TrackingEvents;
	eventProperties?: Record<string, unknown>;
	routeName?: RootStackRouteNames;
	routeParams?: Record<string, unknown>;
}

export function Pressable({
	onPress,
	forceHaptic = false,
	eventName,
	eventProperties,
	routeName,
	routeParams,
	children,
	...rest
}: PressableProps) {
	const { navigate } = useNavigation();
	const { hapticFeedback } = usePreferencesStore();
	const { currentLanguage } = useLanguage();

	function invokeTrackEvent() {
		if (eventName) {
			mixpanelTrack(eventName, {
				platform: Platform.OS,
				language: currentLanguage,
				...(eventProperties || {}),
			});
		}
	}

	function invokeHapticFeedback() {
		if (hapticFeedback || forceHaptic) {
			HapticFeedback.trigger("impactAsync" as HapticFeedbackTypes);
		}
	}

	function invokeNavigate() {
		if (routeName && routeParams) {
			navigate(routeName, routeParams);
			return;
		}
		if (routeName) {
			navigate(routeName);
			return;
		}
	}

	function handleOnPress() {
		invokeHapticFeedback();
		invokeTrackEvent();
		invokeNavigate();

		if (onPress) {
			onPress();
		}
	}

	return (
		<NativePressable onPress={handleOnPress} {...rest} accessible>
			{children}
		</NativePressable>
	);
}
