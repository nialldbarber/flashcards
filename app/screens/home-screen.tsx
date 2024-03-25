import { zodResolver } from "@hookform/resolvers/zod";
import { Canvas, Circle } from "@shopify/react-native-skia";
import { AddCircle, Setting2 } from "iconsax-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
	FlatList,
	StyleSheet,
	TextInput,
	View,
	useWindowDimensions,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";
import { z } from "zod";

import { Pressable } from "#/app/components/core/pressable";
import { List } from "#/app/components/list";
import { atoms as a } from "#/app/design-system/atoms";
import { Button } from "#/app/design-system/components/button";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Text } from "#/app/design-system/components/text";
import { flatten } from "#/app/design-system/utils/flatten";
import { useFlashcardsStore } from "#/app/store/flashcards";

const groupSchema = z.object({
	name: z.string().min(1).max(30),
	// emoji: z.string().emoji(),
});
export type Group = z.infer<typeof groupSchema>;

const TRANSITION_DURATION = 450;
const ICON_SIZE = 70;
const ICON_SIZE_HALF = ICON_SIZE / 2;

export function HomeScreen() {
	const { t } = useTranslation();
	const { groups, addGroup } = useFlashcardsStore();
	const [isFocused, setIsFocused] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { width, height } = useWindowDimensions();
	const r = useSharedValue(0);
	const visibility = useSharedValue(1);
	const offscreenVisibility = useSharedValue(0);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<Group>({
		resolver: zodResolver(groupSchema),
	});

	function invokeOpenGroupForm() {
		const diagonal = Math.sqrt(width * width + height * height);

		setIsModalOpen(!isModalOpen);
		if (isModalOpen) {
			r.value = withTiming(0, { duration: TRANSITION_DURATION });
			visibility.value = withDelay(
				100,
				withTiming(1, { duration: TRANSITION_DURATION }),
			);
			offscreenVisibility.value = withTiming(0, {
				duration: TRANSITION_DURATION,
			});
		} else {
			r.value = withTiming(diagonal * 1, {
				duration: TRANSITION_DURATION,
			});
			visibility.value = withTiming(0, {
				duration: TRANSITION_DURATION,
			});
			offscreenVisibility.value = withDelay(
				100,
				withTiming(1, { duration: TRANSITION_DURATION }),
			);
		}
	}

	function invokeCreateGroup({ name, emoji }: Group) {
		console.log({ name, emoji });
		// addGroup(data);
	}

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: visibility.value,
	}));
	const offscreenAnimatedStyle = useAnimatedStyle(() => ({
		opacity: offscreenVisibility.value,
	}));

	const noGroupsExist = groups.length === 0;
	const calculateLeft = width / 2 - ICON_SIZE_HALF;

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
					<Circle cx={width / 2} cy={height} r={r} color="#0f172a" />
				</Canvas>
			</View>
			<>
				<Layout scrollable={false}>
					{/* <DebugLayout> */}
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
								<Setting2 size="40" color="#FF8A65" variant="Bulk" />
							</Pressable>
						</View>

						<View style={flatten([a.mt4])}>
							<TextInput
								style={flatten([
									isFocused ? a.bgWhite : a.bgSlate800,
									a.roundedLg,
									a.p4,
									a.textLg,
								])}
								placeholder={t("screens.home.searchPlaceholderText")}
								placeholderTextColor={
									isFocused
										? a.textSlate950.color
										: a.textSlate50.color
								}
								onChangeText={() => {}}
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
													a.itemsCenter,
													a.justifyCenter,
													a.py4,
													a.mb6,
													a.roundedFull,
													{
														borderColor: "#9162c0",
														borderWidth: 2,
														backgroundColor: "#9162c025",
													},
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
					{/* </DebugLayout> */}
				</Layout>
			</>
			<View
				style={flatten([
					a.absolute,
					a.bottom10,
					a.z12,
					{ left: calculateLeft },
				])}
			>
				<Button
					// eventName="CREATE_NEW_GROUP"
					aria-label={t("screens.home.a11y.createNewGroup")}
					onPress={invokeOpenGroupForm}
				>
					<AddCircle
						size={ICON_SIZE}
						color="#FF8A65"
						variant="Bulk"
					/>
				</Button>
			</View>
			<Animated.View
				style={[
					offscreenAnimatedStyle,
					flatten([
						a.absolute,
						a.right8,
						a.left5,
						a.right5,
						a.z12,
						isModalOpen ? a.z12 : a.z0,
						{ top: 200 },
					]),
				]}
			>
				<Text>{t("screens.home.addNewGroup")}</Text>
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<TextInput
							value={value}
							style={flatten([
								isFocused ? a.bgWhite : a.bgSlate800,
								a.roundedLg,
								a.p4,
								a.textLg,
							])}
							onChangeText={(text) => onChange(text)}
							placeholder={t("screens.home.addNewGroupPlaceholder")}
							placeholderTextColor={
								isFocused ? a.textSlate950.color : a.textSlate50.color
							}
							onFocus={() => {
								setIsFocused(true);
							}}
							onBlur={() => {
								setIsFocused(false);
							}}
						/>
					)}
					name="name"
				/>
				<Button onPress={handleSubmit(invokeCreateGroup)}>
					Create Group
				</Button>
			</Animated.View>
		</>
	);
}
