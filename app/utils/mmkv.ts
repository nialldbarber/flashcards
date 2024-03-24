import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export function setItem(key: string, value: string) {
	storage.set(key, value);
}

export function getItem(key: string) {
	return storage.getString(key);
}

export function getAllItems() {
	return storage.getAllKeys();
}

export function removeItem(key: string) {
	storage.delete(key);
}

export function clearItems() {
	storage.clearAll();
}
