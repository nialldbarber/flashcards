import { Mixpanel } from "mixpanel-react-native";
import Config from "react-native-config";

const trackAutomaticEvents = false;
const mixpanel = new Mixpanel(
	Config.MIXPANEL_PROJECT_TOKEN as string,
	trackAutomaticEvents,
);
mixpanel.init();

export function mixpanelTrack(
	event: string,
	properties?: Record<string, unknown>,
) {
	mixpanel.track(event, properties);
}
