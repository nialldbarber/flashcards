import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { storeMiddleware } from "app/utils/store-middleware";

type PreferencesState = {
	hapticFeedback: boolean;
	setHapticFeedback: (hapticFeedback: boolean) => void;
};

export const usePreferencesStore = create(
	persist<PreferencesState>(
		(set) => ({
			hapticFeedback: true,
			setHapticFeedback: (hapticFeedback: boolean) => {
				set({ hapticFeedback });
			},
		}),
		{
			name: "preferences_state",
			storage: createJSONStorage(() => storeMiddleware),
		},
	),
);
