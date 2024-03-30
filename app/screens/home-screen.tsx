import { zodResolver } from "@hookform/resolvers/zod";
import { Canvas, Circle } from "@shopify/react-native-skia";
import { AddCircle, Setting2 } from "iconsax-react-native";
import { useCallback, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlatList, View, useWindowDimensions } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";
import uuid from "react-native-uuid";
import { z } from "zod";

import { Pressable } from "#/app/components/core/pressable";
import { List } from "#/app/components/list";
import { atoms as a } from "#/app/design-system/atoms";
import { Button } from "#/app/design-system/components/button";
import { Layout } from "#/app/design-system/components/scroll-layout";
import { Text } from "#/app/design-system/components/text";
import { flatten } from "#/app/design-system/utils/flatten";
import { useFlashcardsStore } from "#/app/store/flashcards";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../design-system/components/input";
import { Spacer } from "../design-system/components/spacer";

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

const TRANSITION_DURATION = 450;
const ICON_SIZE = 70;
const ICON_SIZE_HALF = ICON_SIZE / 2;

export function HomeScreen() {
	const { t } = useTranslation();
	const { navigate } = useNavigation();
	const { groups, addGroup } = useFlashcardsStore();
	const { width, height } = useWindowDimensions();

	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const closeModal = useCallback(() => {
		r.value = withTiming(0, { duration: TRANSITION_DURATION });
		visibility.value = withDelay(
			100,
			withTiming(1, { duration: TRANSITION_DURATION }),
		);
		offscreenVisibility.value = withTiming(0, {
			duration: TRANSITION_DURATION,
		});
	}, [r, visibility, offscreenVisibility]);
	const openModal = useCallback(() => {
		const diagonal = Math.sqrt(width * width + height * height);
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
	}, [r, visibility, offscreenVisibility, width, height]);

	function invokeOpenGroupForm() {
		setIsModalOpen(!isModalOpen);
		if (isModalOpen) {
			closeModal();
		} else {
			openModal();
		}
	}

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
			// close modal
			closeModal();
			// navigate to card list
			setTimeout(() => {
				const flashcards = getFlashcardsFromId(id);
				navigate("CardList", {
					name,
					emoji,
					flashcards,
				});
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
	const calculateLeft = width / 2 - ICON_SIZE_HALF;

	return (
		<>
			<View
				style={flatten([
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
							<Input value="" onChange={() => {}} />
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
					shape="circle"
					animationType="spin"
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
						isModalOpen ? a.z12 : a._z2,
						{ top: 200 },
					]),
				]}
			>
				<Text>{t("screens.home.addNewGroup")}</Text>
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<Input value={value} onChange={onChange} />
					)}
					name="name"
				/>
				<Spacer size="12px" />
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<Input value={value} onChange={onChange} />
					)}
					name="emoji"
				/>
				<Text styles={flatten([a.textSm])} isError>
					{errors.emoji?.message}
				</Text>
				<Button onPress={handleSubmit(invokeCreateGroup)}>
					{t("screens.home.createNewGroupButton")}
				</Button>
			</Animated.View>
		</>
	);
}
