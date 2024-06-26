export const size = {
	auto: "auto",
	"0px": 0,
	"0.66px": 0.66,
	"1px": 1,
	"2px": 2,
	"3px": 3,
	"4px": 4,
	"6px": 6,
	"8px": 8,
	"11px": 11,
	"12px": 12,
	"13px": 13,
	"14px": 14,
	"16px": 16,
	"18px": 18,
	"20px": 20,
	"22px": 22,
	"24px": 24,
	"28px": 28,
	"30px": 30,
	"32px": 32,
	"36px": 36,
	"40px": 40,
	"48px": 48,
	"64px": 64,
	"80px": 80,
	"96px": 96,
	"112px": 112,
	"128px": 128,
} as const;

export type Size = typeof size;
export type SizeScale = keyof Size;
