import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColor } from '../hooks/useColor'
import { AuthContext } from '../context/AuthContext'
import { colors } from '../../assets/theme/color'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

export default function Settings({ navigation }) {
	const { currentUser } = useContext(AuthContext)
	const { theme } = useColor(currentUser)
	function handlePress() {
		navigation.goBack()
	}
	return (
		<SafeAreaView style={styles2.settingsContainer}>
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
					style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}
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
					style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}
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
					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
						<TouchableOpacity
							style={
								theme === 'white'
									? styles.settingsThemeChange
									: styles2.settingsThemeChange
							}
						></TouchableOpacity>
						<TouchableOpacity
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
		padding: 10,
		minWidth: '50%',
	},
	settingsBtn: {},
	settingsButton: {
		backgroundColor: colors.dark.text,
		padding: 10,
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
})
const styles = StyleSheet.create({
	settingsThemeChange: {
		height: 80,
		width: 120,
		borderRadius: 10,
	},
	settingsThemeChange2: {
		height: 60,
		width: 90,
		borderRadius: 10,
	},
})
