import type { EffectCallback } from "react";
import { useEffect } from "react";

export function useEffectIgnoreDeps(
	effect: EffectCallback,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	deps: any[] = [],
) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(effect, deps);
}
