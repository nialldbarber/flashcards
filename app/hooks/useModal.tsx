import { useCallback, useState } from "react";
import { useWindowDimensions } from "react-native";
import {
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";

const TRANSITION_DURATION = 450;

export function useModal() {
	const { width, height } = useWindowDimensions();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const r = useSharedValue(0);
	const visibility = useSharedValue(1);
	const offscreenVisibility = useSharedValue(0);

	const closeModal = useCallback(() => {
		r.value = withTiming(0, { duration: TRANSITION_DURATION });
		visibility.value = withDelay(
			100,
			withTiming(1, { duration: TRANSITION_DURATION }),
		);
		offscreenVisibility.value = withTiming(0, {
			duration: TRANSITION_DURATION,
		});
	}, [r, visibility, offscreenVisibility]);

	const openModal = useCallback(() => {
		const diagonal = Math.sqrt(width * width + height * height);
		r.value = withTiming(diagonal * 1, {
			duration: TRANSITION_DURATION,
		});
		visibility.value = withTiming(0, {
			duration: TRANSITION_DURATION,
		});
		offscreenVisibility.value = withDelay(
			100,
			withTiming(1, { duration: TRANSITION_DURATION }),
		);
	}, [r, visibility, offscreenVisibility, width, height]);

	function invokeOpenGroupForm() {
		setIsModalOpen(!isModalOpen);
		if (isModalOpen) {
			closeModal();
		} else {
			openModal();
		}
	}

	return {
		r,
		offscreenVisibility,
		visibility,
		openModal,
		closeModal,
		isModalOpen,
		invokeOpenGroupForm,
		setIsModalOpen,
	};
}
