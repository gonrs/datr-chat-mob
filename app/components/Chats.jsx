import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../../assets/theme/color'
import { useColor } from '../hooks/useColor'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

export default function Chats({ navigation }) {
	const [chats, setChats] = useState([])
	const { currentUser } = useContext(AuthContext)
	const { dispatch, data } = useContext(ChatContext)

	useEffect(() => {
		function getChats() {
			const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
				setChats(doc.data())
			})
			return () => {
				unsub()
			}
		}
		currentUser && currentUser.uid && getChats()
	}, [currentUser])
	function handleSelect(user) {
		dispatch({ type: 'CHENGE_USER', payload: user })

		// console.log('qwe +', data)
		navigation.navigate('Messages', { theme })
	}
	const { theme } = useColor(currentUser)
	const sortedChats = chats
		? Object.entries(chats).sort((a, b) => b[1].date - a[1].date)
		: {}
	return (
		<View style={theme === 'white' ? styles.homeUsers : styles2.homeUsers}>
			{chats && (
				<FlatList
					data={sortedChats}
					renderItem={({ item }) => {
						const chat = item[1]
						let lastMessageText = chat.lastMessage?.text ?? ''
						if (lastMessageText.length > 35) {
							lastMessageText = lastMessageText.slice(0, 30) + '...'
						}
						// console.log('qwe', chat.userInfo)
						return (
							<TouchableOpacity
								onPress={() => handleSelect(chat.userInfo)}
								style={theme === 'white' ? styles.user : styles2.user}
							>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										gap: 10,
									}}
								>
									<Image
										source={{ uri: chat.userInfo?.photoURL }}
										style={theme === 'white' ? styles.userImg : styles2.userImg}
									/>
									<Text
										style={
											theme === 'white'
												? styles.userNameTitle
												: styles2.userNameTitle
										}
									>
										{chat.userInfo?.displayName}
									</Text>
								</View>
								<Text
									style={
										theme === 'white' ? styles.userLastmes : styles2.userLastmes
									}
								>
									{lastMessageText}
								</Text>
								<Text
									style={theme === 'white' ? styles.userTime : styles2.userTime}
								>
									{/* Time */}
								</Text>
							</TouchableOpacity>
						)
					}}
					keyExtractor={item => item[0]}
				/>
			)}
		</View>
	)
}

const styles2 = StyleSheet.create({
	homeUsers: {
		width: '100%',
		// alignItems: 'center',
	},
	user: {
		borderRadius: 10,
		backgroundColor: colors.dark.itemBg,
		width: '96%',
		borderBottomLeftRadius: 0,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		justifyContent: 'space-between',
		marginTop: 10,
		marginLeft: '2%',
		marginBottom: 2,
	},
	userImg: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff' },
	userLastmes: {
		color: colors.dark.text,
	},
	userTime: {},
	homeTextHed: {
		fontSize: 12,
		color: colors.dark.text,
	},
	userNameTitle: {
		color: colors.dark.text,
		fontSize: 14,
	},
})
const styles = StyleSheet.create({
	homeUsers: {
		width: '100%',
		// alignItems: 'center',
	},
	user: {
		borderRadius: 10,
		backgroundColor: colors.white.itemBg,
		width: '96%',
		borderBottomLeftRadius: 0,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		justifyContent: 'space-between',
		marginTop: 10,
		marginLeft: '2%',
		marginBottom: 2,
	},
	userImg: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff' },
	userLastmes: {
		color: colors.white.text,
	},
	userTime: {},
	homeTextHed: {
		fontSize: 12,
		color: colors.white.text,
	},
	userNameTitle: {
		color: colors.white.text,
		fontSize: 14,
	},
})
