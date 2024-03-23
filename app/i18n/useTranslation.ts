import { useTranslation as usei18nTranslation } from "react-i18next";

import type { TranslationKeys } from "#/app/i18n";

type Translation = {
	t: (key: TranslationKeys) => string;
};

export function useTranslation(): Translation {
	const { t } = usei18nTranslation();
	const typedT = (key: TranslationKeys) => t(key as string);
	return { t: typedT };
}
