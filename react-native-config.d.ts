declare module "react-native-config" {
	export interface NativeConfig {
		MIXPANEL_PROJECT_TOKEN?: string;
	}

	export const Config: NativeConfig;
	export default Config;
}
