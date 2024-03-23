export const trackingEvents = [
	"NAVIGATED_TO_SETTINGS",
	"CREATE_NEW_GROUP",
	"GROUP_COMPLETED",
] as const;

export type TrackingEvents = (typeof trackingEvents)[number];
