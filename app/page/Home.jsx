import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useColor } from '../hooks/useColor'
import { colors } from '../../assets/theme/color'
import { TextInput } from 'react-native-gesture-handler'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'

export default function Home({ navigation }) {
	const { currentUser } = useContext(AuthContext)
	const { theme } = useColor(currentUser)
	function logout() {
		console.log('LogOut')
		signOut(auth)
	}
	useEffect(() => {
		if (!currentUser) {
			navigation.navigate('Login')
		}
	}, [currentUser, navigation])
	return (
		<View style={theme === 'white' ? styles.homeCon : styles2.homeCon}>
			<View style={theme === 'white' ? styles.homeHeader : styles2.homeHeader}>
				<View style={theme === 'white' ? styles.topInfo : styles2.topInfo}>
					<Text
						style={theme === 'white' ? styles.homeTitle : styles2.homeTitle}
					>
						DATR MOBILE
					</Text>
					<Image
						source={{
							uri:
								currentUser && currentUser.user
									? currentUser.user.photoURL
									: currentUser.photoURL,
						}}
						style={theme === 'white' ? styles.homeImg : styles2.homeImg}
					/>
				</View>
				<View
					style={theme === 'white' ? styles.homeSearch : styles2.homeSearch}
				>
					<TextInput
						style={theme === 'white' ? styles.homeInput : styles2.homeInput}
						placeholder='Search for users...'
					/>
				</View>
			</View>
			<ScrollView
				style={theme === 'white' ? styles.homeUsers : styles2.homeUsers}
			>
				<View style={theme === 'white' ? styles.user : styles2.user}>
					<Image style={theme === 'white' ? styles.userImg : styles2.userImg} />
					<Text
						style={theme === 'white' ? styles.userLastmes : styles2.userLastmes}
					>
						{currentUser && currentUser.user
							? currentUser.user.displayName
							: currentUser.displayName}
					</Text>
					<Text style={theme === 'white' ? styles.userTime : styles2.userTime}>
						Time
					</Text>
				</View>
				<TouchableOpacity onPress={logout}>
					<Text style={styles.text}>Log out</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	)
}
const styles2 = StyleSheet.create({
	homeCon: {
		flex: 1,
		backgroundColor: colors.dark.bg,
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: '100%',
	},
	homeHeader: {
		backgroundColor: colors.dark.header,
		width: '100%',
		height: '17%',
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
		paddingLeft: '20%',
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
	homeUsers: {
		width: '100%',
		height: '83%',
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
	userLastmes: {},
	userTime: {},
})
const styles = StyleSheet.create({
	homeCon: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
