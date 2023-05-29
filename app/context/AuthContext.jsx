import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../../firebase'
import Loading from '../page/Loading'
import { useColor } from '../hooks/useColor'
import { useAuthState } from 'react-firebase-hooks/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	// const [currentUser] = useAuthState(auth)
	const [currentUser, setCurrentUser] = useState({})
	const [currentUserLocal, setcurrentUserLocal] = useState({})
	const [loading, setLoading] = useState(true)
	const { theme } = useColor(currentUser)
	useEffect(() => {
		console.log('1')
		AsyncStorage.getItem('currentUser').then(user => {
			setcurrentUserLocal(JSON.parse(user))
		})
		const un = onAuthStateChanged(auth, user => {
			console.log('2')
			if (user) {
				AsyncStorage.setItem('currentUser', JSON.stringify(user))
				console.log('3')
			} else if (!user && !currentUserLocal) {
			} else if (!user && currentUserLocal) {
				console.log('4')

				AsyncStorage.getItem('currentUser').then(user => {
					setCurrentUser(JSON.parse(user))
					AsyncStorage.getItem('userPass').then(pass => {
						login(auth, user, pass)
					})
				})
			}
			setLoading(false)
		})

		return () => {
			un()
		}
	}, [])

	return (
		<AuthContext.Provider value={{ currentUser, theme }}>
			{loading || (currentUser && theme === 'standart') ? (
				<Loading />
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}
