import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import Loading from '../page/Loading'
import { useColor } from '../hooks/useColor'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signInWithCustomToken } from 'firebase/auth'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({})
	const [loading, setLoading] = useState(true)
	const { theme } = useColor(currentUser)
	const [isLog, setisLog] = useState(false)
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			const users = AsyncStorage.getItem('currentUser')
			if (user) {
				AsyncStorage.setItem('currentUser', JSON.stringify(user))
				setCurrentUser(user)
			} else {
				if (!users) {
					setCurrentUser(null)
				} else if (users) {
					signInWithToken(users.uid)
				}
			}
		})
		AsyncStorage.getItem('currentUser').then(user => {
			if (user) {
				setCurrentUser(JSON.parse(user))
			} else {
				setCurrentUser(null)
			}
			setLoading(false)
		})
		return () => unsubscribe()
	}, [isLog])
	async function signInWithToken(token) {
		try {
			await signInWithCustomToken(auth, token)
		} catch (error) {
			console.log(error)
			console.log('error:')
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
