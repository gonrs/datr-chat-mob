import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useColor } from '../hooks/useColor'
import { AuthContext } from '../context/AuthContext'
import { colors } from '../../assets/theme/color'
import {
	where,
	collection,
	query,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
	serverTimestamp,
	doc,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'
//
export default function Search() {
	const { currentUser } = useContext(AuthContext)
	const { theme } = useColor(currentUser)
	//
	const [userName, setUserName] = useState('')
	const [user, setUser] = useState(null)
	const [err, setErr] = useState(false)

	async function handleSearch(text) {
		console.log('serach...')
		try {
			if (text !== currentUser.displayName) {
				const q = query(
					collection(db, 'users'),
					where('displayName', '==', text)
				)
				const queruSnapshot = await getDocs(q)
				queruSnapshot.forEach(data => {
					setUser(data.data())
				})
			}
		} catch (err) {
			setErr(true)
			setUser(null)
		}
	}

	async function handleSelect() {
		console.log(0)
		let commbinedId = null
		if (currentUser.uid) {
			commbinedId =
				currentUser.uid > user.uid
					? currentUser.uid + user.uid
					: user.uid + currentUser.uid
		} else if (currentUser.user.uid) {
			commbinedId =
				currentUser.user.uid > user.uid
					? currentUser.user.uid + user.uid
					: user.uid + currentUser.user.uid
		}
		try {
			const res = await getDoc(doc(db, 'chats', commbinedId))
			if (!res.exists()) {
				await setDoc(doc(db, 'chats', commbinedId), { message: [] })
				//
				await updateDoc(doc(db, 'userChats', currentUser.uid), {
					[commbinedId + '.userInfo']: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					},
					[commbinedId + '.date']: serverTimestamp(),
				})
				await updateDoc(doc(db, 'userChats', user.uid), {
					[commbinedId + '.userInfo']: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
					},
					[commbinedId + '.date']: serverTimestamp(),
				})
			}
		} catch (err) {
			console.log(err)
		}
		setUser(null)
		setUserName('')
		//
	}

	return (
		<View>
			<View style={theme === 'white' ? styles.homeSearch : styles2.homeSearch}>
				<TextInput
					keyboardType='default'
					value={userName}
					onChangeText={text => {
						handleSearch(text)
						setUserName(text)
					}}
					name=''
					id=''
					style={theme === 'white' ? styles.homeInput : styles2.homeInput}
					placeholder='Search for users...'
				/>
				{user && userName && user.displayName === userName ? (
					<TouchableOpacity
						onPress={() => handleSelect()}
						style={theme === 'white' ? styles.user : styles2.user}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								gap: 10,
							}}
						>
							<Image
								source={{ uri: user.photoURL }}
								style={theme === 'white' ? styles.userImg : styles2.userImg}
							/>
							<Text
								style={
									theme === 'white'
										? styles.userNameTitle
										: styles2.userNameTitle
								}
							>
								{user.displayName}
							</Text>
						</View>
					</TouchableOpacity>
				) : (
					<View></View>
				)}
			</View>
			<View></View>
		</View>
	)
}

const styles2 = StyleSheet.create({
	homeSearch: {
		width: '100%',
		backgroundColor: colors.dark.header,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	homeInput: {
		textAlign: 'center',
		borderRadius: 10,
		backgroundColor: colors.dark.itemBg,
		minWidth: '60%',
		padding: 6,
		fontSize: 15,
		textAlign: 'left',
		color: colors.dark.text,
	},
	user: {
		borderRadius: 10,
		backgroundColor: colors.dark.itemBg,
		width: 300,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		justifyContent: 'space-between',
		marginTop: 10,
		marginLeft: '2%',
		marginBottom: 2,
	},
	userImg: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff' },
	userLastmes: {
		color: colors.dark.text,
	},
	userTime: {},
	homeTextHed: {
		fontSize: 12,
		color: colors.dark.text,
	},
	userNameTitle: {
		color: colors.dark.text,
		fontSize: 14,
	},
})
const styles = StyleSheet.create({})
