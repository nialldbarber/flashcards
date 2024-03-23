import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import lv from "./lv.json";

export const resources = {
	en: { translation: en },
	lv: { translation: lv },
} as const;

i18n.use(initReactI18next).init({
	compatibilityJSON: "v3",
	resources,
	lng: "en",
	fallbackLng: "en",
	keySeparator: false,
	interpolation: {
		escapeValue: false,
	},
	debug: true,
});

// export `en` because all translation keys should
// be the same across all languages
export type TranslationKeys = keyof typeof en;
export default i18n;
