export const radii = {
	none: 0,
	small: 4,
	medium: 8,
	large: 12,
	larger: 20,
	full: 100,
} as const;

export type Radii = keyof typeof radii;
