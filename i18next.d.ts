import "react-i18next";

declare module "react-i18next" {
	export interface Resources {
		translation: typeof import("./app/i18n/en.json");
	}
}

export function use(initReactI18next: ThirdPartyModule) {
	throw new Error("Function not implemented.");
}
