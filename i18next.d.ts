import "react-i18next";

declare module "react-i18next" {
	export interface Resources {
		translation: typeof import("./app/i18n/en.json");
	}
}
