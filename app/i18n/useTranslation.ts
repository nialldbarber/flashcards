import { useTranslation as usei18nTranslation } from "react-i18next";

export function useTranslation() {
	const { t } = usei18nTranslation();
	return { t };
}
