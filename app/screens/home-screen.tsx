import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { Canvas, Circle } from "@shopify/react-native-skia";
import { AddCircle, Setting2 } from "iconsax-react-native";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlatList, View, useWindowDimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import uuid from "react-native-uuid";
import { z } from "zod";

import { Pressable } from "#/app/components/core/pressable";
import { List } from "#/app/components/list";
import { atoms as a } from "#/app/design-system/atoms";
import { Button } from "#/app/design-system/components/button";
import { Input } from "#/app/design-system/components/input";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Spacer } from "#/app/design-system/components/spacer";
import { Text } from "#/app/design-system/components/text";
import { f } from "#/app/design-system/utils/flatten";
import { useModal } from "#/app/hooks/useModal";
import { useFlashcardsStore } from "#/app/store/flashcards";

const groupSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Name must be at least 1 character long." })
		.max(30, { message: "Name must not exceed 30 characters." }),
	emoji: z
		.string()
		.regex(
			/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
			{ message: "Must be a valid emoji" },
		),
});
export type Group = z.infer<typeof groupSchema>;

const ICON_SIZE = 70;

export function HomeScreen() {
	const { t } = useTranslation();
	const { navigate } = useNavigation();
	const { groups, addGroup } = useFlashcardsStore();
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

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
	} = useForm<Group>({
		resolver: zodResolver(groupSchema),
	});

	// @TODO: make sure groups can't have same name
	const getFlashcardsFromId = (id: string) => {
		const group = groups.find((group) => group.id === id);
		return group?.flashcards ?? [];
	};

	const invokeCreateGroup: SubmitHandler<Group> = ({
		name,
		emoji,
	}) => {
		if (name && emoji) {
			const id = String(uuid.v4());
			// add group to store
			addGroup({
				id,
				name,
				emoji,
			});
			// navigate to card list
			setTimeout(() => {
				const flashcards = getFlashcardsFromId(id);
				navigate("CardList", {
					name,
					emoji,
					flashcards,
				});
				// close modal
				setIsModalOpen(false);
				closeModal();
			}, 500);
		}
	};

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
								aria-label={t("screens.home.a11y.goToSettings")}
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
												style={f([
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
												<Text withEmoji level="heading" size="23px">
													{item.emoji}
												</Text>
												<Text withEmoji level="heading" size="23px">
													{item.name}
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
						aria-label={t("screens.home.a11y.createNewGroup")}
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
				<Spacer size="12px" />
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<Input
							value={value}
							onChange={onChange}
							placeholder={t(
								"screens.home.createNewGroupEmojiPlaceholder",
							)}
						/>
					)}
					name="emoji"
				/>
				<Text styles={f([a.textSm])} isError>
					{errors.emoji?.message}
				</Text>

				<View style={f([a.flex, a.flexRow])}>
					<Pressable
						style={f([
							a.w7,
							a.h7,
							{ backgroundColor: "#0091ff" },
							a.roundedFull,
						])}
					/>
					<Pressable
						style={f([
							a.w7,
							a.h7,
							{ backgroundColor: "#e5484d" },
							a.roundedFull,
						])}
					/>
					<Pressable
						style={f([
							a.w7,
							a.h7,
							{ backgroundColor: "#d6409f" },
							a.roundedFull,
						])}
					/>
					<Pressable
						style={f([
							a.w7,
							a.h7,
							{ backgroundColor: "#f76808" },
							a.roundedFull,
						])}
					/>
					<Pressable
						style={f([
							a.w7,
							a.h7,
							{ backgroundColor: "#30a46c" },
							a.roundedFull,
						])}
					/>
					<Pressable
						style={f([
							a.w7,
							a.h7,
							{ backgroundColor: "#f5d90a" },
							a.roundedFull,
						])}
					/>
				</View>

				<Button onPress={handleSubmit(invokeCreateGroup)}>
					{t("screens.home.createNewGroupButton")}
				</Button>
			</Animated.View>
		</>
	);
}
