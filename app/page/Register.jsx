import React, { useState, useContext } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { colors } from '../../assets/theme/color'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Register = ({ navigation }) => {
	const { currentUser } = useContext(AuthContext)
	// const loadFonts = async () => {
	// 	await Font.loadAsync({
	// 		customFont: require('../../assets/fonts/DMMono-Light.ttf'),
	// 	})
	// }

	// React.useEffect(() => {
	// 	loadFonts()
	// }, [])
	const [displayName, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function handleRegister(e) {
		e.preventDefault()
		if (displayName && email && password) {
			try {
				const res = await createUserWithEmailAndPassword(auth, email, password)
				// console.log(res)
				AsyncStorage.setItem('currentUser', JSON.stringify(res))
				await updateProfile(res.user, {
					displayName,
					photoURL:
						'https://firebasestorage.googleapis.com/v0/b/datr-c02d6.appspot.com/o/happy.png?alt=media&token=e3b0a539-2153-4c6b-b349-38e60968dce5',
				})
				console.log('profile success')
				await setDoc(doc(db, 'users', res.user.uid), {
					uid: res.user.uid,
					displayName,
					email,
					photoURL:
						'https://firebasestorage.googleapis.com/v0/b/datr-c02d6.appspot.com/o/happy.png?alt=media&token=e3b0a539-2153-4c6b-b349-38e60968dce5',
					theme: '#24242F',
				})
				console.log('add users success')
				await setDoc(doc(db, 'userChats', res.user.uid), {})
				console.log('add userChat success')
				setUsername('')
				setEmail('')
				setPassword('')
				// navigation.navigate('Home')
			} catch (err) {
				console.log(err)
			}
		} else {
			setError(true)
			if (!displayName) {
				setTextError('Введите имя!')
			}
			if (!email) {
				setTextError('Введите почту!')
			}
			if (!password) {
				setTextError('Введите пароль!')
			}
			// if (!file) {
			// 	setTextError('Выберете картинку!')
			// }
		}
	}
	function handleRegirect() {
		navigation.navigate('Login')
	}

	return (
		<View style={styles.containerLogin}>
			<Text style={styles.loginTitle}>DATR MOBILE</Text>
			<View style={styles.logCon}>
				<TextInput
					style={styles.input}
					placeholder='Name'
					value={displayName}
					onChangeText={setUsername}
				/>
				<TextInput
					style={styles.input}
					placeholder='Email@mail.xyz'
					value={email}
					onChangeText={setEmail}
					keyboardType='email-address'
				/>
				<TextInput
					style={styles.input}
					placeholder='Password'
					value={password}
					secureTextEntry={true}
					onChangeText={setPassword}
				/>
				<TouchableOpacity style={styles.singUpBtn} onPress={handleRegirect}>
					<Text style={styles.singUp}>or sing in</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.button} onPress={handleRegister}>
				<Text style={styles.buttonText}>Sing up</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Register
const styles = StyleSheet.create({
	containerLogin: {
		flex: 1,
		backgroundColor: colors.dark.bg,
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-between',
		padding: 100,
	},
	logCon: {
		// flex: 1,
		// paddingTop: '40%',
	},
	loginTitle: {
		fontSize: 24,
		color: colors.dark.text,
	},
	input: {
		paddingLeft: 20,
		paddingRight: 20,
		minWidth: 280,
		marginBottom: 16,
		backgroundColor: colors.dark.reg,
		borderRadius: 12,
		paddingTop: 10,
		paddingBottom: 10,
		color: colors.dark.bg,
		// placeholderTextColor: colors.dark.bg,
	},
	button: {
		padding: 12,
		backgroundColor: colors.dark.reg,
		borderRadius: 4,
	},
	buttonText: {
		color: colors.dark.bg,
		fontSize: 18,
	},
	singUpBtn: {
		backgroundColor: 'none',
		textAlign: 'center',
		alignItems: 'center',
		borderRadius: 12,
	},
	singUp: {
		color: colors.dark.fog,
	},
})
