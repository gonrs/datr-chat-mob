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
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const { theme } = useColor(currentUser)

	useEffect(() => {
		console.log('1')
		const unsubscribe = auth.onAuthStateChanged(user => {
			console.log(1)
			if (user) {
				AsyncStorage.setItem('currentUser', JSON.stringify(user))
				setCurrentUser(user)
				console.log('SetUser =', user)
			} else {
				AsyncStorage.removeItem('currentUser')
				setCurrentUser(null)
			}
			setLoading(false)
		})
		AsyncStorage.getItem('currentUser').then(user => {
			console.log('GetUser = ', user)
			if (user) {
				setCurrentUser(JSON.parse(user))
				setLoading(false)
			} else {
				setLoading(false)
			}
			setLoading(false)
		})
		return () => unsubscribe()
	}, [])

	const signIn = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	const signUp = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	}

	const signOut = () => {
		return signOut(auth)
	}

	const resetPassword = email => {
		return auth.sendPasswordResetEmail(email)
	}

	const updateEmail = email => {
		return currentUser.updateEmail(email)
	}

	const updatePassword = password => {
		return currentUser.updatePassword(password)
	}
	return (
		<AuthContext.Provider value={{ currentUser, theme }}>
			{loading ? <Loading /> : children}
		</AuthContext.Provider>
	)
}
