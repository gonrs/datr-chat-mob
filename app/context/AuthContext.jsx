// import {
// 	onAuthStateChanged,
// 	signInWithEmailAndPassword,
// 	signOut,
// } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../../firebase'
import Loading from '../page/Loading'
import { useColor } from '../hooks/useColor'
// import { useAuthState } from 'react-firebase-hooks/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signInWithCustomToken } from 'firebase/auth'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	// const [currentUser] = useAuthState(auth)
	const [currentUser, setCurrentUser] = useState({})
	const [loading, setLoading] = useState(true)
	const { theme } = useColor(currentUser)
	const [isLog, setisLog] = useState(false)
	useEffect(() => {
		// console.log('effect')
		const unsubscribe = auth.onAuthStateChanged(user => {
			const users = AsyncStorage.getItem('currentUser')
			if (user) {
				AsyncStorage.setItem('currentUser', JSON.stringify(user))
				setCurrentUser(user)
				// console.log('Пользователь вошел в аккаунт.')
			} else {
				if (!users) {
					setCurrentUser(null)
				} else if (users) {
					signInWithToken(users.uid)
					// console.log(users.uid)
				}
				// console.log('Пользователь вышел из аккаунта.')
			}
			// console.log('currentUser = ', user)
			// setLoading(false)
		})
		AsyncStorage.getItem('currentUser').then(user => {
			// console.log('GetUser = ', user)
			if (user) {
				setCurrentUser(JSON.parse(user))
				// setLoading(false)
			} else {
				setCurrentUser(null)
				// setLoading(false)
			}
			setLoading(false)
			// console.log('effect2')
		})
		return () => unsubscribe()
	}, [isLog])
	async function signInWithToken(token) {
		try {
			const userCredential = await signInWithCustomToken(auth, token)
			// console.log('User signed in successfully')
		} catch (error) {
			// console.log('Failed to sign in with token: ', error.message)
		}
	}
	return (
		<AuthContext.Provider value={{ currentUser, theme, setisLog, isLog }}>
			{loading || (currentUser && theme === 'standart') ? (
				<Loading />
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}
