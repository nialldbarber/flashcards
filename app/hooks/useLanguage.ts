import { useTranslation } from "react-i18next";

import type { Languages } from "#/app/i18n";
import { setItem } from "#/app/utils/mmkv";

export function useLanguage() {
	const { i18n } = useTranslation();

	function changeLanguage(language: Languages) {
		// change the language in local storage
		setItem("language", language);
		// change the language in i18n
		i18n.changeLanguage(language);
	}

	function getCurrentLanguage() {
		return i18n.language as Languages;
	}

	const currentLanguage = getCurrentLanguage();

	return { changeLanguage, currentLanguage };
}
