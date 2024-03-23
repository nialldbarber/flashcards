import type { StateStorage } from "zustand/middleware";

import { storage } from "app/utils/mmkv";

export const storeMiddleware: StateStorage = {
	setItem: (key, value) => {
		return storage.set(key, value);
	},
	getItem: (key) => {
		const value = storage.getString(key);
		return value ?? null;
	},
	removeItem: (key) => {
		return storage.delete(key);
	},
};
