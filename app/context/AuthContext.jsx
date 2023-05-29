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

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	// const [currentUser] = useAuthState(auth)
	const [currentUser, setCurrentUser] = useState({})
	const [loading, setLoading] = useState(true)
	const { theme } = useColor(currentUser)
	const [isLog, setisLog] = useState(false)
	useEffect(() => {
		console.log('effect')
		const unsubscribe = auth.onAuthStateChanged(user => {
			console.log('Auth user = ', user)
			if (user) {
				AsyncStorage.setItem('currentUser', JSON.stringify(user))
				setCurrentUser(user)
				console.log('Пользователь вошел в аккаунта.')
			} else {
				setCurrentUser(null)
				console.log('Пользователь вышел из аккаунта.')
			}
			// setLoading(false)
		})
		AsyncStorage.getItem('currentUser').then(user => {
			console.log('GetUser = ', user)
			if (user) {
				setCurrentUser(JSON.parse(user))
				// setLoading(false)
			} else {
				setCurrentUser(null)
				// setLoading(false)
			}
			setLoading(false)
			console.log('effect2')
		})
		return () => unsubscribe()
	}, [isLog])

	return (
		<AuthContext.Provider value={{ currentUser, theme, setisLog, isLog }}>
			{loading ? <Loading /> : children}
		</AuthContext.Provider>
	)
}
