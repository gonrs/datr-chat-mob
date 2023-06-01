import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColor } from '../hooks/useColor'
import { AuthContext } from '../context/AuthContext'
import { colors } from '../../assets/theme/color'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

export default function Settings({ navigation, route }) {
	const { currentUser } = useContext(AuthContext)
	// const { theme } = route.params
	const { theme } = useColor(currentUser)
	function handlePress() {
		navigation.goBack()
	}
	// Change Theme
	async function toggleTheme(colors) {
		await updateDoc(doc(db, 'users', currentUser && currentUser.uid), {
			theme: colors,
		})
	}
	// console.log(theme)
	// if (theme !== 'standart') {
	return (
		<SafeAreaView
			style={
				theme === 'white' ? styles.settingsContainer : styles2.settingsContainer
			}
		>
			<View
				style={
					theme === 'white' ? styles.settingsHeader : styles2.settingsHeader
				}
			>
				<TouchableOpacity onPress={handlePress}>
					<Text
						style={
							theme === 'white'
								? styles.settingsBackButton
								: styles2.settingsBackButton
						}
					>
						Back
					</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
					<Text
						style={
							theme === 'white'
								? styles.settingsUserName
								: styles2.settingsUserName
						}
					>
						Settings
					</Text>
				</View>
			</View>
			<ScrollView>
				{/* <Text>Settings</Text> */}
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						gap: 20,
					}}
				>
					<TouchableOpacity>
						<Image
							style={
								theme === 'white' ? styles.settingsImg : styles2.settingsImg
							}
						/>
					</TouchableOpacity>
					<TextInput
						style={
							theme === 'white' ? styles.settingsName : styles2.settingsName
						}
						placeholder='Change userName'
					/>
					<TouchableOpacity
						style={theme === 'white' ? styles.settingsBtn : styles2.settingsBtn}
					>
						<Text
							style={
								theme === 'white'
									? styles.settingsButton
									: styles2.settingsButton
							}
						>
							Save{' '}
						</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						gap: 20,
					}}
				>
					<Text
						style={
							theme === 'white' ? styles.settingsTitle : styles2.settingsTitle
						}
					>
						Reset Password
					</Text>
					<TextInput
						style={
							theme === 'white' ? styles.settingsName : styles2.settingsName
						}
						placeholder='New password'
					/>
					<TouchableOpacity
						style={theme === 'white' ? styles.settingsBtn : styles2.settingsBtn}
					>
						<Text
							style={
								theme === 'white'
									? styles.settingsButton
									: styles2.settingsButton
							}
						>
							Save{' '}
						</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						gap: 20,
						padding: 10,
					}}
				>
					<Text
						style={
							theme === 'white' ? styles.settingsTitle : styles2.settingsTitle
						}
					>
						Change theme
					</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: 20,
						}}
					>
						<TouchableOpacity
							onPress={() => {
								toggleTheme('#24242F')
							}}
							style={
								theme === 'white'
									? styles.settingsThemeChange
									: styles2.settingsThemeChange
							}
						></TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								toggleTheme('#C4C4C6')
							}}
							style={
								theme === 'white'
									? styles.settingsThemeChange2
									: styles2.settingsThemeChange2
							}
						></TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
	// }
}

const styles2 = StyleSheet.create({
	settingsContainer: {
		backgroundColor: colors.dark.bg,
		// justifyContent: 'space-between',
		height: '100%',
	},
	settingsHeader: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: colors.dark.itemBg,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	settingsImg: {
		width: 200,
		height: 200,
		backgroundColor: '#fff',
		borderRadius: 100,
		margin: 20,
	},
	settingsUserName: {
		color: colors.dark.text,
		fontSize: 30,
	},
	settingsBackButton: {
		color: colors.dark.text,
		fontSize: 18,
	},
	settingsName: {
		color: colors.dark.text,
		backgroundColor: colors.dark.reg,
		borderRadius: 10,
		padding: 15,
		minWidth: '80%',
	},
	settingsBtn: {},
	settingsButton: {
		backgroundColor: colors.dark.text,
		padding: 15,
		borderRadius: 10,
		textAlign: 'center',
		textAlign: 'center',
	},
	settingsTitle: {
		color: colors.dark.text,
		fontSize: 20,
		paddingTop: 20,
	},
	settingsThemeChange: {
		backgroundColor: colors.dark.back,
		height: 80,
		width: 120,
		borderRadius: 10,
	},
	settingsThemeChange2: {
		backgroundColor: colors.dark.text,
		height: 60,
		width: 90,
		borderRadius: 10,
	},
})
const styles = StyleSheet.create({
	settingsThemeChange: {
		backgroundColor: colors.dark.back,
		height: 60,
		width: 90,
		borderRadius: 10,
	},
	settingsThemeChange2: {
		backgroundColor: colors.dark.text,
		height: 80,
		width: 120,
		borderRadius: 10,
	},
	settingsContainer: {
		backgroundColor: colors.white.bg,
		// justifyContent: 'space-between',
		height: '100%',
		width: '100%',
	},
	settingsHeader: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: colors.white.itemBg,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	settingsImg: {
		width: 200,
		height: 200,
		backgroundColor: '#fff',
		borderRadius: 100,
		margin: 20,
	},
	settingsUserName: {
		color: colors.white.text,
		fontSize: 30,
	},
	settingsBackButton: {
		color: colors.white.text,
		fontSize: 18,
	},
	settingsName: {
		color: colors.white.text,
		backgroundColor: colors.white.reg,
		borderRadius: 10,
		padding: 15,
		minWidth: '80%',
	},
	settingsBtn: {},
	settingsButton: {
		backgroundColor: colors.white.itemBg,
		color: colors.white.text,
		padding: 15,
		borderRadius: 10,
		textAlign: 'center',
		textAlign: 'center',
	},
	settingsTitle: {
		color: colors.white.text,
		fontSize: 20,
		paddingTop: 20,
	},
})
