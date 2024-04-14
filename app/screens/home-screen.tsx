import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { Canvas, Circle } from "@shopify/react-native-skia";
import { AddCircle, AddSquare, Setting2 } from "iconsax-react-native";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlatList, View, useWindowDimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import uuid from "react-native-uuid";
import EmojiPicker, { type EmojiType } from "rn-emoji-keyboard";
import { z } from "zod";

import { Pressable } from "#/app/components/core/pressable";
import { List } from "#/app/components/list";
import { atoms as a } from "#/app/design-system/atoms";
import { themeColors } from "#/app/design-system/colors";
import { Button } from "#/app/design-system/components/button";
import { Input } from "#/app/design-system/components/input";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Spacer } from "#/app/design-system/components/spacer";
import { Text } from "#/app/design-system/components/text";
import { f } from "#/app/design-system/utils/flatten";
import { useEffectIgnoreDeps } from "#/app/hooks/useEffectIgnoreDeps";
import { useModal } from "#/app/hooks/useModal";
import { state$ } from "#/app/store/";

const groupSchema = z.object({
	name: z
		.string({
			required_error: "A group name is required",
			invalid_type_error: "Name must be a string",
		})
		.min(1, { message: "Must be at least 1 character long" })
		.max(30, { message: "Must not exceed 30 characters!" }),
});
export type Group = z.infer<typeof groupSchema>;

const ICON_SIZE = 70;

export function HomeScreen() {
	const { groups, addGroup } = state$.get();

	const { t } = useTranslation();
	const { navigate } = useNavigation();
	const { width, height } = useWindowDimensions();
	const {
		r,
		offscreenVisibility,
		visibility,
		setIsModalOpen,
		closeModal,
		isModalOpen,
		invokeOpenGroupForm,
	} = useModal();

	const [selectEmoji, setSelectEmoji] = useState<EmojiType>();
	const [selectEmojiError, setSelectEmojiError] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isThemeColorSelected, setIsThemeColorSelected] = useState<
		number | null
	>(null);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<Group>({
		resolver: zodResolver(groupSchema),
	});

	// @TODO: make sure groups can't have same name
	const getFlashcardsFromId = (id: string) => {
		const group = groups.find((group) => group.id === id);
		return group?.flashcards ?? [];
	};

	const invokeCreateGroup: SubmitHandler<Group> = ({ name }) => {
		if (selectEmoji === undefined) {
			setSelectEmojiError(true);
			return;
		}

		setSelectEmojiError(false);

		if (name && selectEmoji && isThemeColorSelected !== null) {
			const id = String(uuid.v4());
			// add group to store
			addGroup({
				id,
				name,
				emoji: selectEmoji.emoji,
				themeColor: themeColors[isThemeColorSelected ?? 0],
			});
			// navigate to card list
			setTimeout(() => {
				const flashcards = getFlashcardsFromId(id);
				navigate("CardList", {
					name,
					emoji: selectEmoji.emoji,
					flashcards,
				});
				// close modal
				closeModal();
				setIsModalOpen(false);
			}, 500);
		}
	};

	useEffectIgnoreDeps(() => {
		// when the modal is closed, reset the form
		// also reset the theme color selection
		if (!isModalOpen) {
			setTimeout(() => {
				setIsThemeColorSelected(null);
				reset();
				setSelectEmoji(undefined);
			}, 1000);
		}
	}, [isModalOpen]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: visibility.value,
	}));
	const offscreenAnimatedStyle = useAnimatedStyle(() => ({
		opacity: offscreenVisibility.value,
	}));

	const noGroupsExist = groups.length === 0;

	return (
		<>
			<View
				style={f([
					a.fillSpace,
					a.itemsCenter,
					isModalOpen ? a.z10 : a._z2,
				])}
			>
				<Canvas style={{ width, height }}>
					<Circle
						cx={width / 2}
						cy={height}
						r={r}
						color={a.bgDarkBlue.backgroundColor}
					/>
				</Canvas>
			</View>
			<>
				<Layout scrollable={false}>
					{/* <DebugLayout> */}
					<Animated.View style={animatedStyle}>
						<View
							style={f([
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
								accessibilityLabel={t(
									"screens.home.a11y.goToSettings",
								)}
							>
								<Setting2 size="40" color="#FF8A65" variant="Bulk" />
							</Pressable>
						</View>

						<View style={f([a.mt4])}>
							<Input
								value=""
								onChange={() => {}}
								placeholder={t("screens.home.searchPlaceholderText")}
							/>
						</View>

						<View style={f([a.mt5])}>
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
												animate
												style={f([
													a.flexRow,
													a.itemsCenter,
													a.justifyCenter,
													a.py4,
													a.mb6,
													a.roundedFull,
													{
														borderColor:
															item?.themeColor?.hex ?? "#9162c0",
														borderWidth: 2,
														backgroundColor:
															item?.themeColor?.faded ?? "#9162c025",
													},
												])}
												routeName="CardList"
												routeParams={{
													name: item.name,
													emoji: item.emoji,
													flashcards: item.flashcards,
												}}
											>
												<Text withEmoji level="heading" size="20px">
													{item.emoji} {item.name}
												</Text>
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
				style={f([
					// a.absolute,
					a.bottom10,
					a.right0,
					a.left0,
					a.z12,
					// { left: calculateLeft },
					{ width },
				])}
			>
				<LinearGradient
					colors={["transparent", a.bgSlate950.backgroundColor]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={{
						position: "absolute",
						zIndex: 999,
						left: 0,
						right: 0,
						// height: 50,
						bottom: 0,
					}}
				>
					<Button
						// eventName="CREATE_NEW_GROUP"
						accessibilityLabel={t("screens.home.a11y.createNewGroup")}
						onPress={invokeOpenGroupForm}
						shape="circle"
						animationType="spin"
						resetAnimation={isSubmitSuccessful}
					>
						<AddCircle
							size={ICON_SIZE}
							color="#FF8A65"
							variant="Bulk"
						/>
					</Button>
				</LinearGradient>
			</View>
			<Animated.View
				style={[
					offscreenAnimatedStyle,
					f([
						a.absolute,
						a.right8,
						a.left5,
						a.right5,
						a.z12,
						isModalOpen ? a.z12 : a._z2,
						{ top: 200 },
					]),
				]}
			>
				<Text>{t("screens.home.addNewGroup")}</Text>
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<Input
							value={value}
							onChange={onChange}
							placeholder={t(
								"screens.home.createNewGroupTextPlaceholder",
							)}
						/>
					)}
					name="name"
				/>
				<View style={f([a.h7, a.justifyCenter])}>
					<Text overideStyles={f([a.textXs, a.p0, a.m0])} isError>
						{errors.name?.message}
					</Text>
				</View>
				<Spacer size="12px" />
				<Pressable
					style={f([a.flexRow, a.itemsCenter, a.justifyCenter])}
					onPress={() => setIsOpen(true)}
					accessibilityLabel={t(
						"screens.home.a11y.createNewGroupEmoji",
					)}
					animate
				>
					<AddSquare size={25} color="#FF8A65" variant="Bulk" />
					<View style={f([a.ml2])}>
						<Text>Add an emoji</Text>
					</View>
					<View style={f([a.ml2])}>
						<Text>{selectEmoji?.emoji}</Text>
					</View>
				</Pressable>
				<Text>{}</Text>
				<EmojiPicker
					onEmojiSelected={(emoji) => setSelectEmoji(emoji)}
					open={isOpen}
					onClose={() => setIsOpen(false)}
				/>
				<View style={f([a.h7, a.justifyCenter])}>
					{selectEmojiError && (
						<Text overideStyles={f([a.textXs])} isError>
							{t("screens.home.selectEmojiError")}
						</Text>
					)}
				</View>
				<View
					style={f([
						a.flex,
						a.flexRow,
						a.justifyCenter,
						a.mt4,
						a.mb7,
					])}
				>
					{themeColors.map(({ color, hex }, index) => (
						<Animated.View
							key={`${color}-${hex}-${index}`}
							style={f([
								a.relative,
								a.w7,
								a.h7,
								a.mx2,
								a.justifyCenter,
								a.itemsCenter,
							])}
						>
							<Pressable
								onPress={() => setIsThemeColorSelected(index)}
								style={f([
									a.wFull,
									a.hFull,
									{ backgroundColor: hex },
									a.roundedFull,
								])}
							/>
							{isThemeColorSelected === index && (
								<View
									style={f([
										a.absolute,
										a.w10,
										a.h10,
										a.bgTransparent,
										a.roundedFull,
										a.border2,
										a.borderSlate50,
										a._z1,
									])}
								/>
							)}
						</Animated.View>
					))}
				</View>
				<Button
					onPress={handleSubmit(invokeCreateGroup)}
					accessibilityLabel={t(
						"screens.home.a11y.createNewGroupButtonA11y",
					)}
				>
					{t("screens.home.createNewGroupButton")}
				</Button>
			</Animated.View>
		</>
	);
}
