import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import MessageItem from './MessageItem'
import { AuthContext } from '../context/AuthContext'
import { useColor } from '../hooks/useColor'
import { colors } from '../../assets/theme/color'

export default function MessagesContainer() {
	// const [rep, setrep] = useState(1)
	const { currentUser } = useContext(AuthContext)
	const { theme } = useColor(currentUser)
	//
	const { data } = useContext(ChatContext)
	const [messages, setMessages] = useState([])
	useEffect(() => {
		const onSub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
			doc.exists() && setMessages(doc.data().message)
		})
		if (messages.length > 0) {
			TViewRef.current.scrollToEnd({ animated: true })
		}
		return () => {
			onSub()
		}
	}, [data.chatId])
	const scrollViewRef = useRef(null)
	//
	if (messages) {
		useEffect(() => {
			if (messages.length > 0) {
				scrollViewRef.current.scrollToEnd({ animated: true })
			}
			setTimeout(() => {
				if (messages.length > 0) {
					scrollViewRef.current.scrollToEnd({ animated: true })
				}
			}, 500)
		}, [messages])
	}
	const [show, setshow] = useState(null)
	function openImg(img) {
		setshow(img)
	}
	function closeImg() {
		setshow(null)
	}
	useEffect(() => {
		closeImg()
	}, [data])
	return (
		<>
			<FlatList
				data={messages}
				ref={scrollViewRef}
				keyExtractor={(item, index) => index.toString()}
				renderItem={value => {
					return <MessageItem openImg={openImg} message={value} />
				}}
			/>
			{show && (
				<View
					style={
						theme === 'white' ? styles.messageOpenImg : styles2.messageOpenImg
					}
				>
					<ScrollView>
						<View>
							<TouchableOpacity onPress={closeImg}>
								<Text
									style={
										theme === 'white'
											? styles.messageOpenText
											: styles2.messageOpenText
									}
								>
									Close
								</Text>
							</TouchableOpacity>
							<Image
								style={{ width: 400, height: 500, marginBottom: 20 }}
								// style={{ width: '100%', height: '100%', marginBottom: 20 }}
								source={{ uri: show }}
							/>
						</View>
					</ScrollView>
				</View>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	messageOpenText: {
		color: colors.white.text,
	},
	messageOpenImg: {
		width: '100%',
		height: '100%',
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

const styles2 = StyleSheet.create({
	messageOpenText: {
		color: colors.dark.text,
	},
	messageOpenImg: {
		width: '100%',
		height: '100%',
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
