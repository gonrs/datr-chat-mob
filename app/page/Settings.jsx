import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColor } from '../hooks/useColor'
import { AuthContext } from '../context/AuthContext'
import { colors } from '../../assets/theme/color'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'
import { signOut, updateProfile } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Settings({ navigation }) {
	const { currentUser, setisLog, isLog } = useContext(AuthContext)
	// const { theme } = route.params
	const { theme } = useColor(currentUser)
	//
	const [value, setValue] = useState(currentUser.displayName)
	const [file, setFile] = useState(null)
	//
	const bgFile = file ? `${file}` : `${currentUser.photoURL}`
	console.log(file)
	//
	function logout() {
		console.log('LogOut')
		AsyncStorage.removeItem('currentUser')
		setisLog(!isLog)
		signOut(auth)
		console.log(currentUser ? true : false)
	}
	//
	async function handleSubmit() {
		console.log(1)
		if (value !== currentUser.displayName || file !== null) {
			console.log(2)
			if (value !== currentUser.displayName && file !== null && value !== '') {
				try {
					const response = await fetch(file)
					const blob = await response.blob()
					const storageRef = ref(storage, currentUser.email)
					const uploadTask = uploadBytesResumable(storageRef, blob)
					uploadTask.on(
						error => {
							console.log(error)
							console.log('upload error')
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then(
								async downloadURL => {
									await updateProfile(currentUser, {
										displayName: value,
										photoURL: downloadURL,
									})
									await updateDoc(doc(db, 'users', currentUser?.uid), {
										displayName: value,
										photoURL: downloadURL,
									})
								}
							)
						}
					)
				} catch (err) {
					console.log(err)
				}
			} else if (
				value !== currentUser.displayName &&
				file === null &&
				value !== ''
			) {
				try {
					await updateProfile(currentUser, {
						displayName: value,
						photoURL: currentUser.photoURL,
					})
					await updateDoc(doc(db, 'users', currentUser?.uid), {
						displayName: value,
						photoURL: currentUser.photoURL,
					})
				} catch (err) {
					console.log(err)
				}
			} else if (value === currentUser.displayName && file !== null) {
				console.log(4)
				try {
					console.log(5)
					const response = await fetch(file)
					const blob = await response.blob()
					const storageRef = ref(storage, currentUser.email)
					const uploadTask = uploadBytesResumable(storageRef, blob)
					console.log(6)
					uploadTask.on(
						'state_changed',
						snapshot => {
							const progress =
								(snapshot.bytesTransferred / snapshot.totalBytes) * 100
							console.log(`Upload is ${progress}% done`)
						},
						error => {
							console.log(error)
							console.log('upload error')
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref)
								.then(async downloadURL => {
									console.log(7)

									console.log(8)
									await updateDoc(doc(db, 'users', currentUser?.uid), {
										displayName: currentUser.displayName,
										photoURL: downloadURL,
									})
									try {
										console.log(currentUser)
										await updateProfile(currentUser, {
											displayName: currentUser.displayName,
											photoURL: downloadURL,
										})
									} catch (e) {
										console.log(e)
									}
								})
								.catch(err => console.log(err))
						}
					)
				} catch (err) {
					console.log('err')
				}
			}
		}
	}
	async function changeImg() {
		const result = await ImagePicker.launchImageLibraryAsync({})
		if (!result.canceled) {
			setFile(result.assets[0].uri)
		}
	}
	//
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
					<TouchableOpacity onPress={changeImg}>
						<Image
							source={{ uri: bgFile }}
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
						onPress={handleSubmit}
						style={theme === 'white' ? styles.settingsBtn : styles2.settingsBtn}
					>
						<Text
							style={
								theme === 'white'
									? styles.settingsButton
									: styles2.settingsButton
							}
						>
							Save
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
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						marginTop: 30,
					}}
				>
					<TouchableOpacity onPress={logout}>
						<Text
							style={
								theme === 'white'
									? styles.settingsLogout
									: styles2.settingsLogout
							}
						>
							Log out
						</Text>
					</TouchableOpacity>
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
	settingsLogout: {
		color: colors.dark.text,
		fontSize: 30,
		textAlign: 'center',
		padding: 20,
		borderRadius: 10,
		backgroundColor: colors.dark.itemBg,
	},
})
const styles = StyleSheet.create({
	settingsLogout: {
		color: colors.dark.text,
		fontSize: 30,
		textAlign: 'center',
		padding: 20,
		borderRadius: 10,
		backgroundColor: colors.dark.itemBg,
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
