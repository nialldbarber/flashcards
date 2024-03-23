import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { storeMiddleware } from "#/app/utils/store-middleware";

type PreferencesState = {
	hapticFeedback: boolean;
	setHapticFeedback: (hapticFeedback: boolean) => void;
	language: "en" | "lv";
	setLanguage: (language: "en" | "lv") => void;
};

export const usePreferencesStore = create(
	persist<PreferencesState>(
		(set) => ({
			hapticFeedback: true,
			language: "en",
			setHapticFeedback: (hapticFeedback: boolean) => {
				set({ hapticFeedback });
			},
			setLanguage: (language: "en" | "lv") => {
				set({ language });
			},
		}),
		{
			name: "preferences_state",
			storage: createJSONStorage(() => storeMiddleware),
		},
	),
);
