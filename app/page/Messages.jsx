import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useColor } from '../hooks/useColor'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import MessagesContainer from '../components/MessagesContainer'
import { colors } from '../../assets/theme/color'
import Input from '../components/Input'

export default function Messages({ navigation }) {
	const { data } = useContext(ChatContext)
	// const [showModal, setShowModal] = useState(false)
	const { currentUser } = useContext(AuthContext)
	const { theme } = useColor(currentUser)
	//
	//
	useEffect(() => {
		if (!currentUser || data.user.uid === currentUser.uid || !data.user.uid) {
			navigation.navigate('Home')
		}
	}, [data, currentUser])
	function handlePress() {
		navigation.goBack()
	}
	console.log(data)
	return (
		<SafeAreaView>
			{currentUser && data.user.uid && data.user.uid !== currentUser.uid ? (
				<View
					style={
						theme === 'white' ? styles.chatContainer : styles2.chatContainer
					}
				>
					<View
						style={theme === 'white' ? styles.chatHeader : styles2.chatHeader}
					>
						<TouchableOpacity onPress={handlePress}>
							<Text
								style={
									theme === 'white'
										? styles.chatBackButton
										: styles2.chatBackButton
								}
							>
								Back
							</Text>
						</TouchableOpacity>
						<View
							style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
						>
							<Text
								style={
									theme === 'white' ? styles.chatUserName : styles2.chatUserName
								}
							>
								{data.user.displayName}
							</Text>
							<Image
								source={{ uri: data.user?.photoURL }}
								style={
									theme === 'white' ? styles.chatUserImg : styles2.chatUserImg
								}
							/>
						</View>
					</View>
					<MessagesContainer />
					<Input />
				</View>
			) : (
				() => {
					navigation.navigate('Home')
				}
			)}
		</SafeAreaView>
	)
}

const styles2 = StyleSheet.create({
	chatContainer: {
		backgroundColor: colors.dark.bg,
		justifyContent: 'space-between',
		height: '100%',
	},
	chatHeader: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: colors.dark.itemBg,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	chatUserImg: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#fff',
	},
	chatUserName: {
		color: colors.dark.text,
		fontSize: 20,
	},
	chatBackButton: {
		color: colors.dark.text,
		fontSize: 18,
	},
})
const styles = StyleSheet.create({})
