import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "#/app/i18n/en.json";
import lv from "#/app/i18n/lv.json";
import { getItem } from "#/app/utils/mmkv";

export const resources = {
	en: { translation: en },
	lv: { translation: lv },
} as const;

export const defaultNS = "en";
export type Languages = keyof typeof resources;

const currentLanguage =
	(getItem("language") as keyof typeof resources | null) || "en";

i18n.use(initReactI18next).init({
	compatibilityJSON: "v3",
	resources,
	lng: currentLanguage,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
	debug: true,
});

export default i18n;
