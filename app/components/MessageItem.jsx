import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { useColor } from '../hooks/useColor'
import { colors } from '../../assets/theme/color'

export default function MessageItem({ message }) {
	const { currentUser } = useContext(AuthContext)
	const { data } = useContext(ChatContext)
	const { theme } = useColor(currentUser)
	// const ref = useRef(null)
	// useEffect(() => {
	// 	ref.current?.scrollIntoView({ behavior: 'smooth' })
	// }, [message])
	const mes = Object.entries(message)
	const messages = mes[0][1]
	// console.log(messages.img && messages.img)
	return (
		<View
			style={
				messages.senderId === currentUser.uid
					? styles2.messageOwner
					: styles2.message
			}
		>
			<View
				style={
					theme === 'white' ? styles.messageContent : styles2.messageContent
				}
			>
				<Text
					style={theme === 'white' ? styles.messageMes : styles2.messageMes}
				>
					{messages?.text}
				</Text>

				{messages?.img && (
					<Image
						style={{ width: 200, height: 200, padding: 0, margin: 0 }}
						source={{ uri: messages.img }}
					/>
				)}
				<Text
					style={theme === 'white' ? styles.messageDate : styles2.messageDate}
				>
					{messages?.date}
				</Text>
			</View>
		</View>
	)
}

const styles2 = StyleSheet.create({
	messageOwner: {
		padding: 10,
		alignSelf: 'flex-end',
	},
	message: {
		padding: 10,
		alignSelf: 'flex-start',
	},
	messageDate: {
		color: colors.dark.text,
		opacity: 0.7,
		marginTop: 5,
		fontSize: 12,
	},
	messageContent: {
		backgroundColor: colors.dark.header,
		borderRadius: 10,
		padding: 10,

		marginLeft: 10,
		maxWidth: '80%',
	},
	messageMes: {
		color: colors.dark.text,
		fontSize: 16,
		padding: 0,
		margin: 0,
	},
})
const styles = StyleSheet.create({})
