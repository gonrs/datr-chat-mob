import React, { useContext, useEffect, useState } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { colors } from '../../assets/theme/color'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useColor } from '../hooks/useColor'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({ navigation }) => {
	const { currentUser } = useContext(AuthContext)
	const { theme } = useColor(currentUser)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)
	const [serverError, setServerError] = useState(false)

	const handleLogin = async () => {
		try {
			// AsyncStorage.setItem('userPass', password)
			// await signInWithEmailAndPassword(auth, email, password).then(user => {
			// 	AsyncStorage.setItem('currentUser', JSON.stringify(user))

			// })
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			// await AsyncStorage.setItem('userToken', userCredential.user.uid)
			setEmail('')
			setPassword('')
		} catch (err) {
			console.log(err)
			setError(true)
			setServerError(true)
		}
	}
	function handleRegirect() {
		navigation.navigate('Register')
	}

	return (
		<View
			style={theme === 'white' ? styles.containerLogin : styles2.containerLogin}
		>
			<Text style={theme === 'white' ? styles.loginTitle : styles2.loginTitle}>
				DATR MOBILE
			</Text>
			<View style={theme === 'white' ? styles.logCon : styles2.logCon}>
				<TextInput
					style={theme === 'white' ? styles.input : styles2.input}
					placeholder='Email@mail.xyz'
					value={email}
					onChangeText={setEmail}
					keyboardType={'email-address'}
				/>
				<TextInput
					style={theme === 'white' ? styles.input : styles2.input}
					placeholder='Password'
					value={password}
					secureTextEntry={true}
					onChangeText={setPassword}
				/>
				{error || serverError ? (
					<Text style={styles2.error}>Wrong true login or password</Text>
				) : (
					''
				)}
				<TouchableOpacity
					style={theme === 'white' ? styles.singUpBtn : styles2.singUpBtn}
					onPress={handleRegirect}
				>
					<Text style={theme === 'white' ? styles.singUp : styles2.singUp}>
						or sing up
					</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={theme === 'dark' ? styles.button : styles2.button}
				onPress={handleLogin}
			>
				<Text
					style={theme === 'white' ? styles.buttonText : styles2.buttonText}
				>
					Sing in
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Login
const styles = StyleSheet.create({
	containerLogin: {
		flex: 1,
		backgroundColor: colors.white.bg,
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
		color: colors.white.text,
	},
	input: {
		paddingLeft: 20,
		paddingRight: 20,
		minWidth: 280,
		marginBottom: 16,
		backgroundColor: colors.white.reg,
		borderRadius: 12,
		paddingTop: 10,
		paddingBottom: 10,
		color: colors.white.bg,
	},
	button: {
		padding: 12,
		backgroundColor: colors.white.reg,
		borderRadius: 4,
	},
	buttonText: {
		color: colors.white.bg,
		fontSize: 18,
	},
	singUpBtn: {
		backgroundColor: 'none',
		textAlign: 'center',
		alignItems: 'center',
		borderRadius: 12,
	},
	singUp: {
		color: colors.white.fog,
	},
})
const styles2 = StyleSheet.create({
	error: {
		color: 'red',
		textAlign: 'center',
	},
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
