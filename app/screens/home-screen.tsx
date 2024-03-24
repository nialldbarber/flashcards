import { AddCircle, Setting2 } from "iconsax-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	FlatList,
	StyleSheet,
	TextInput,
	View,
	useWindowDimensions,
} from "react-native";

import { Pressable } from "#/app/components/core/pressable";
import { List } from "#/app/components/list";
import { atoms as a } from "#/app/design-system/atoms";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Text } from "#/app/design-system/components/text";
import { flatten } from "#/app/design-system/utils/flatten";
import { useFlashcardsStore } from "#/app/store/flashcards";
import { DebugLayout } from "#/app/utils/debug-layout";
import { Canvas, Circle } from "@shopify/react-native-skia";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";
import { Button } from "../design-system/components/button";

export function HomeScreen() {
	const { t } = useTranslation();
	const { groups } = useFlashcardsStore();
	const [isFocused, setIsFocused] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const { width, height } = useWindowDimensions();
	const r = useSharedValue(0);

	const visibility = useSharedValue(1);

	function invokeCreateGroup() {
		const diagonal = Math.sqrt(width * width + height * height);

		setIsModalOpen(!isModalOpen);
		if (isModalOpen) {
			r.value = withTiming(0, { duration: 450 });
			visibility.value = withDelay(
				100,
				withTiming(1, { duration: 450 }),
			);
		} else {
			r.value = withTiming(diagonal * 1, { duration: 450 });
			visibility.value = withTiming(0, { duration: 450 });
		}
	}

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: visibility.value,
	}));

	const noGroupsExist = groups.length === 0;
	const calculateLeft = width / 2 - 35;

	return (
		<>
			<View
				style={flatten([
					{ ...StyleSheet.absoluteFillObject },
					a.itemsCenter,
					isModalOpen ? a.z10 : a.z0,
				])}
			>
				<Canvas style={{ width: width, height: height }}>
					<Circle cx={width / 2} cy={height} r={r} color="yellow" />
				</Canvas>
			</View>
			<>
				<Layout scrollable={false}>
					<DebugLayout>
						<Animated.View style={animatedStyle}>
							<View
								style={flatten([
									a.itemsStart,
									a.justifyBetween,
									a.flexRow,
									a.my5,
								])}
							>
								<Text level="heading" size="30px">
									{t("app-title")}
								</Text>
								<Pressable
									routeName="SettingsModal"
									eventName="NAVIGATED_TO_SETTINGS"
									eventProperties={{ from: "HomeScreen" }}
									aria-label={t("screens.home.a11y.goToSettings")}
								>
									<Setting2
										size="40"
										color="#FF8A65"
										variant="Bulk"
									/>
								</Pressable>
							</View>

							<View style={flatten([a.mt4])}>
								<TextInput
									style={flatten([
										isFocused ? a.bgWhite : a.bgSlate800,
										a.roundedLg,
										a.h12,
										a.p4,
										a.textLg,
									])}
									placeholder={t(
										"screens.home.searchPlaceholderText",
									)}
									placeholderTextColor={
										isFocused
											? a.textSlate950.color
											: a.textSlate50.color
									}
									onFocus={() => {
										setIsFocused(true);
									}}
									onBlur={() => {
										setIsFocused(false);
									}}
								/>
							</View>

							<View style={flatten([a.mt5])}>
								{noGroupsExist ? (
									<View>
										<Text>{t("screens.home.noGroups")}</Text>
									</View>
								) : (
									<FlatList
										data={groups}
										keyExtractor={(item) => item.id}
										renderItem={({ item, index }) => (
											<List index={index}>
												<Pressable
													key={item.id}
													style={flatten([
														a.flexRow,
														a.wFull,
														a.py4,
														a.mb4,
														a.bgBlue500,
													])}
													routeName="CardList"
													routeParams={{
														name: item.name,
														emoji: item.emoji,
														flashcards: item.flashcards,
													}}
												>
													<Text>{item.emoji}</Text>
													<Text>{item.name}</Text>
												</Pressable>
											</List>
										)}
									/>
								)}
							</View>
						</Animated.View>
					</DebugLayout>
				</Layout>
			</>
			<View
				style={flatten([
					a.absolute,
					a.bottom10,
					a.right8,
					{ left: calculateLeft },
					a.z12,
				])}
			>
				<Button
					// eventName="CREATE_NEW_GROUP"
					aria-label={t("screens.home.a11y.createNewGroup")}
					onPress={invokeCreateGroup}
				>
					<AddCircle size="70" color="#FF8A65" variant="Bulk" />
				</Button>
			</View>
		</>
	);
}
