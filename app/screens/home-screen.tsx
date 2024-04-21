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
import { createStyleSheet, useStyles } from "react-native-unistyles";
import uuid from "react-native-uuid";
import EmojiPicker, { type EmojiType } from "rn-emoji-keyboard";
import { z } from "zod";

import { Pressable } from "#/app/components/core/pressable";
import { List } from "#/app/components/list";
import { colors, themeColors } from "#/app/design-system/colors";
import { Button } from "#/app/design-system/components/button";
import { Input } from "#/app/design-system/components/input";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Spacer } from "#/app/design-system/components/spacer";
import { Text } from "#/app/design-system/components/text";
import { radii } from "#/app/design-system/radii";
import { negativeSpace, space } from "#/app/design-system/space";
import { zIndex } from "#/app/design-system/z-index";
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
	const { styles } = useStyles(stylesheet);
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

	const [searchValue, setSearchValue] = useState("");
	const [selectEmoji, setSelectEmoji] = useState<EmojiType>();
	const [selectEmojiError, setSelectEmojiError] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isThemeColorSelected, setIsThemeColorSelected] = useState<
		number | null
	>(null);

	const filteredGroups = groups.filter((group) =>
		group.name.toLowerCase().includes(searchValue.toLowerCase()),
	);

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
			<View style={styles.container(isModalOpen)}>
				<Canvas style={{ width, height }}>
					<Circle
						cx={width / 2}
						cy={height}
						r={r}
						color={colors.darkBlue}
					/>
				</Canvas>
			</View>
			<>
				<Layout scrollable={false}>
					<Animated.View style={animatedStyle}>
						<View style={styles.cardListContainer}>
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
								<Setting2
									size="40"
									color={colors.brandMain}
									variant="Bulk"
								/>
							</Pressable>
						</View>

						<View style={styles.searchContainer}>
							<Input
								value={searchValue}
								onChange={(text) => setSearchValue(text)}
								placeholder={t("screens.home.searchPlaceholderText")}
								handleRemove={() => setSearchValue("")}
							/>
						</View>

						<View style={styles.groupContainer}>
							{noGroupsExist ? (
								<View>
									<Text>{t("screens.home.noGroups")}</Text>
								</View>
							) : (
								<FlatList
									data={filteredGroups}
									keyExtractor={(item) => item.id}
									renderItem={({ item, index }) => (
										<List index={index}>
											<Pressable
												key={item.id}
												animate
												style={styles.flashcardListItem(
													item.themeColor.hex,
													item.themeColor.faded,
												)}
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
				</Layout>
			</>
			<View style={[styles.gradientContainer, { width }]}>
				<LinearGradient
					colors={["transparent", colors.black]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={styles.gradient}
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
							color={colors.brandMain}
							variant="Bulk"
						/>
					</Button>
				</LinearGradient>
			</View>
			<Animated.View
				style={[
					offscreenAnimatedStyle,
					styles.groupModal(isModalOpen),
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
				<View style={styles.errorMessageContainer}>
					<Text
						size="12px"
						overideStyles={styles.errorMessage}
						isError
					>
						{errors.name?.message}
					</Text>
				</View>
				<Spacer size="12px" />
				<Pressable
					style={styles.newGroupContainer}
					onPress={() => setIsOpen(true)}
					accessibilityLabel={t(
						"screens.home.a11y.createNewGroupEmoji",
					)}
					animate
				>
					<AddSquare
						size={25}
						color={colors.brandMain}
						variant="Bulk"
					/>
					<View style={styles.addEmoji}>
						<Text>Add an emoji</Text>
					</View>
					<View style={styles.addEmoji}>
						<Text>{selectEmoji?.emoji}</Text>
					</View>
				</Pressable>
				<EmojiPicker
					onEmojiSelected={(emoji) => setSelectEmoji(emoji)}
					open={isOpen}
					onClose={() => setIsOpen(false)}
				/>
				<View style={styles.errorMessageContainer}>
					{selectEmojiError && (
						<Text overideStyles={styles.errorMessage} isError>
							{t("screens.home.selectEmojiError")}
						</Text>
					)}
				</View>
				<View style={styles.themes}>
					{themeColors.map(({ color, hex }, index) => (
						<Animated.View
							key={`${color}-${hex}-${index}`}
							style={styles.themeCircleContainer}
						>
							<Pressable
								onPress={() => setIsThemeColorSelected(index)}
								style={styles.themeCircle(hex)}
							/>
							{isThemeColorSelected === index && (
								<View style={styles.themeSelector} />
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

const stylesheet = createStyleSheet(() => ({
	container: (isModalOpen) => ({
		position: "absolute",
		top: space["0px"],
		left: space["0px"],
		right: space["0px"],
		bottom: space["0px"],
		alignItems: "center",
		zIndex: isModalOpen ? zIndex["10px"] : negativeSpace["-2px"],
	}),
	cardListContainer: {
		alignItems: "flex-start",
		justifyContent: "center",
		flexDirection: "row",
		marginVertical: space["5px"],
	},
	searchContainer: {
		marginTop: space["16px"],
	},
	groupContainer: {
		marginTop: space["20px"],
	},
	flashcardListItem: (hex, faded) => ({
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: space["16px"],
		marginBottom: space["24px"],
		borderRadius: radii.full,
		borderWidth: space["2px"],
		borderColor: hex ?? "#9162c0",
		backgroundColor: faded ?? "#9162c025",
	}),
	gradientContainer: {
		bottom: space["42px"],
		right: space["0px"],
		left: space["0px"],
		zIndex: zIndex["10px"],
	},
	gradient: {
		position: "absolute",
		left: space["0px"],
		right: space["0px"],
		bottom: space["0px"],
		zIndex: zIndex["999px"],
	},
	groupModal: (isModalOpen) => ({
		position: "absolute",
		left: space["20px"],
		right: space["20px"],
		zIndex: isModalOpen ? zIndex["10px"] : negativeSpace["-2px"],
		top: 200,
	}),
	newGroupContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	addEmoji: {
		marginLeft: space["8px"],
	},
	themeSelector: {
		position: "absolute",
		width: space["42px"],
		height: space["42px"],
		backgroundColor: colors.transparent,
		borderWidth: space["2px"],
		borderRadius: radii.full,
		borderColor: colors.greyOne,
		zIndex: negativeSpace["-1px"],
	},
	themes: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: space["16px"],
		marginBottom: space["28px"],
	},
	themeCircleContainer: {
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		width: space["28px"],
		height: space["28px"],
		marginHorizontal: space["8px"],
	},
	themeCircle: (hex) => ({
		width: space.full,
		height: space.full,
		borderRadius: radii.full,
		backgroundColor: hex,
	}),
	errorMessageContainer: {
		height: space["28px"],
		justifyContent: "center",
	},
	errorMessage: {
		padding: space["0px"],
		margin: space["0px"],
	},
}));
