import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useColor } from '../hooks/useColor'
import { colors } from '../../assets/theme/color'
import { TextInput } from 'react-native-gesture-handler'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'

import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Chats from '../components/Chats'
import Search from '../components/Search'

export default function Home({ navigation }) {
	const { currentUser, setisLog, isLog } = useContext(AuthContext)
	const { theme } = useColor(currentUser)
	function logout() {
		console.log('LogOut')
		AsyncStorage.removeItem('currentUser')
		setisLog(!isLog)
		signOut(auth)
		console.log(currentUser ? true : false)
	}

	// let photourl
	// if (currentUser && currentUser.user) {
	// 	photourl = currentUser.user.photoURL
	// } else if (currentUser && currentUser.photoURL) {
	// 	photourl = currentUser.photoURL
	// }
	useEffect(() => {
		if (!currentUser) {
			navigation.navigate('Login')
		}
		console.log('Navigate')
	}, [currentUser, navigation, isLog])
	return (
		<SafeAreaView style={theme === 'white' ? styles.homeCon : styles2.homeCon}>
			<View style={theme === 'white' ? styles.homeHeader : styles2.homeHeader}>
				<View style={theme === 'white' ? styles.topInfo : styles2.topInfo}>
					<Text
						style={theme === 'white' ? styles.homeTitle : styles2.homeTitle}
					>
						DATR MOBILE
					</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate('Settings', { theme })}
						style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
					>
						<Text
							style={
								theme === 'white' ? styles.homeTextHed : styles2.homeTextHed
							}
						>
							{currentUser.displayName}
						</Text>
						<Image
							source={
								currentUser && {
									uri: currentUser.photoURL,
								}
							}
							style={theme === 'white' ? styles.homeImg : styles2.homeImg}
						/>
					</TouchableOpacity>
				</View>
				<Search />
			</View>
			{currentUser && <Chats navigation={navigation} />}
			{/* <TouchableOpacity onPress={logout}>
				<Text style={{ color: '#fff', fontSize: 25 }}>Log out</Text>
			</TouchableOpacity> */}
		</SafeAreaView>
	)
}
const styles2 = StyleSheet.create({
	homeCon: {
		flex: 1,
		backgroundColor: colors.dark.bg,
		// justifyContent: 'flex-start',
		alignItems: 'center',
		// height: '100%',
	},
	homeHeader: {
		backgroundColor: colors.dark.header,
		width: '100%',
	},
	topInfo: {
		width: '100%',
		backgroundColor: colors.dark.header,
		flexDirection: 'row',
	},
	homeTitle: {
		fontSize: 25,
		textAlign: 'center',
		color: colors.dark.text,
		padding: 10,
		paddingLeft: '15%',
		paddingRight: '5%',
	},
	homeImg: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#fff',
	},
	homeSearch: {
		width: '100%',
		backgroundColor: colors.dark.header,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	homeInput: {
		textAlign: 'center',
		borderRadius: 10,
		backgroundColor: colors.dark.itemBg,
		minWidth: '60%',
		padding: 6,
		fontSize: 12,
		textAlign: 'left',
	},
	homeTextHed: {
		fontSize: 20,
		color: colors.dark.text,
	},
})
const styles = StyleSheet.create({
	homeCon: {
		flex: 1,
		backgroundColor: colors.white.bg,
		// justifyContent: 'flex-start',
		alignItems: 'center',
		// height: '100%',
	},
	homeHeader: {
		backgroundColor: colors.white.header,
		width: '100%',
	},
	topInfo: {
		width: '100%',
		backgroundColor: colors.white.header,
		flexDirection: 'row',
	},
	homeTitle: {
		fontSize: 25,
		textAlign: 'center',
		color: colors.white.text,
		padding: 10,
		paddingLeft: '15%',
		paddingRight: '5%',
	},
	homeImg: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#fff',
	},
	homeSearch: {
		width: '100%',
		backgroundColor: colors.white.header,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	homeInput: {
		textAlign: 'center',
		borderRadius: 10,
		backgroundColor: colors.white.itemBg,
		minWidth: '60%',
		padding: 6,
		fontSize: 12,
		textAlign: 'left',
	},
	homeTextHed: {
		fontSize: 20,
		color: colors.white.text,
	},
})
