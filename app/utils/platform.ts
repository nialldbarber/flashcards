import { Platform } from "react-native";

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";
export const isNative = isAndroid || isIOS;
