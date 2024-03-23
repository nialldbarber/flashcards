import createEmojiRegex from "emoji-regex";
import type { ReactNode } from "react";
import React, { Fragment } from "react";
import { StyleSheet, Text } from "react-native";

const emojiRegex = createEmojiRegex();

/**
 * Without this, the `line-height` goes off when
 * an emoji is included in the text
 * @param stringNode
 * @returns React.JSX.Element
 */
export function renderStringWithEmoji(stringNode: ReactNode) {
	const strings = Array.isArray(stringNode) ? stringNode : [stringNode];
	return (
		<Fragment>
			{strings.map((string) => {
				if (typeof string !== "string") {
					return string;
				}

				const emojis = string.match(emojiRegex);
				if (emojis === null) return string;

				return string.split(emojiRegex).map((stringPart, index) => (
					<Fragment key={`emoji-${index}`}>
						{stringPart}
						{emojis[index] ? (
							<Text style={styles.emoji}>{emojis[index]}</Text>
						) : null}
					</Fragment>
				));
			})}
		</Fragment>
	);
}

const styles = StyleSheet.create({
	emoji: {
		color: "black",
		fontFamily: "System",
	},
});
