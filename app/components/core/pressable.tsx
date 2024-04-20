import { useNavigation } from "@react-navigation/native";
import { Fragment } from "react";
import type {
	GestureResponderEvent,
	PressableProps as NativePressableProps,
} from "react-native";
import { Pressable as NativePressable, Platform } from "react-native";
import Animated from "react-native-reanimated";

import { useButtonAnimation } from "#/app/hooks/useButtonAnimation";
import { useHapticFeedback } from "#/app/hooks/useHapticFeedback";
import { useLanguage } from "#/app/hooks/useLanguage";
import type { RootStackRouteNames } from "#/app/navigation/types";
import { mixpanelTrack } from "#/app/services/mixpanel";
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
	accessibilityLabel: string;
	animate?: boolean;
}

export function Pressable(props: PressableProps) {
	const {
		onPress,
		forceHaptic = false,
		eventName,
		eventProperties,
		routeName,
		routeParams,
		accessibilityLabel,
		animate = false,
		children,
		...rest
	} = props;
	const { navigate } = useNavigation();
	const { invokeHapticFeedback } = useHapticFeedback();
	const { currentLanguage } = useLanguage();
	const { style, onPressInOut } = useButtonAnimation("standard");

	function invokeTrackEvent() {
		if (eventName) {
			mixpanelTrack(eventName, {
				platform: Platform.OS,
				language: currentLanguage,
				...(eventProperties || {}),
			});
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

	const handlePressInOut = {
		onPressIn: animate ? () => onPressInOut("in") : undefined,
		onPressOut: animate ? () => onPressInOut("out") : undefined,
	};

	const Container = animate ? Animated.View : Fragment;
	const styles = animate ? style : undefined;

	return (
		<Container {...styles}>
			<NativePressable
				accessible
				role={props.role || "button"}
				disabled={props.disabled}
				onPress={handleOnPress}
				accessibilityLabel={accessibilityLabel}
				{...handlePressInOut}
				{...rest}
			>
				{children}
			</NativePressable>
		</Container>
	);
}
