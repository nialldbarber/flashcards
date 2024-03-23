export const zIndex = {
	"0px": 0,
	"1px": 1,
	"2px": 2,
	"3px": 3,
	"4px": 4,
	"5px": 5,
	"6px": 6,
	"7px": 7,
	"8px": 8,
	"9px": 9,
	"10px": 10,
	"999px": 999,
} as const;

export const negativeZIndex = {
	"-1px": -1,
	"-2px": -2,
	"-3px": -3,
	"-4px": -4,
	"-5px": -5,
	"-6px": -6,
	"-7px": -7,
	"-8px": -8,
	"-9px": -9,
	"-10px": -10,
	"-999px": -999,
} as const;

export type ZIndex = keyof typeof zIndex;
export type NegativeZIndex = keyof typeof negativeZIndex;
