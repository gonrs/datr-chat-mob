import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { useColor } from '../hooks/useColor'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { colors } from '../../assets/theme/color'
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
export default function Input() {
	const { currentUser } = useContext(AuthContext)
	const { theme } = useColor(currentUser)
	const [text, setText] = useState('')
	const [img, setImg] = useState(null)
	const RefFile = useRef(null)
	const { data } = useContext(ChatContext)
	const currentTime = new Date().toLocaleTimeString()

	async function handleClick(e) {
		e.preventDefault()
		if (img || text !== '') {
			// if (img && text !== '') {
			// 	try {
			// 		// const storageRef = ref(storage, uuid())
			// 		const storageRef = ref(storage, `mes+${uuid()}`)
			// 		const uploadTask = uploadBytesResumable(storageRef, img)
			// 		uploadTask.on(
			// 			error => {
			// 				console.log(error)
			// 				console.log('upload error')
			// 			},
			// 			() => {
			// 				getDownloadURL(uploadTask.snapshot.ref).then(
			// 					async downloadURL => {
			// 						await updateDoc(doc(db, 'chats', data.chatId), {
			// 							message: arrayUnion({
			// 								id: uuid(),
			// 								text,
			// 								senderId: currentUser.uid,
			// 								date: currentTime,
			// 								img: downloadURL,
			// 							}),
			// 						})
			// 					}
			// 				)
			// 			}
			// 		)
			// 	} catch (e) {
			// 		console.log(e)
			// 	}
			// }
			if (!img && text !== '') {
				await updateDoc(doc(db, 'chats', data.chatId), {
					message: arrayUnion({
						id: uuid(),
						text,
						senderId: currentUser.uid,
						date: currentTime,
					}),
				})
			}
			// if (img && text === '') {
			// 	try {
			// 		// const storageRef = ref(storage, uuid())
			// 		const storageRef = ref(storage, `mes+${uuid()}`)
			// 		const uploadTask = uploadBytesResumable(storageRef, img)
			// 		uploadTask.on(
			// 			error => {
			// 				console.log(error)
			// 				console.log('upload error')
			// 			},
			// 			() => {
			// 				getDownloadURL(uploadTask.snapshot.ref).then(
			// 					async downloadURL => {
			// 						await updateDoc(doc(db, 'chats', data.chatId), {
			// 							message: arrayUnion({
			// 								id: uuid(),
			// 								text: '',
			// 								senderId: currentUser.uid,
			// 								date: currentTime,
			// 								img: downloadURL,
			// 							}),
			// 						})
			// 					}
			// 				)
			// 			}
			// 		)
			// 	} catch (e) {
			// 		console.log(e)
			// 	}
			// }
			await updateDoc(doc(db, 'userChats', currentUser.uid), {
				[data.chatId + '.lastMessage']: {
					text: text !== '' ? text : 'img',
				},
				[data.chatId + '.date']: currentTime,
			})
			await updateDoc(doc(db, 'userChats', data.user.uid), {
				[data.chatId + '.lastMessage']: {
					text: text !== '' ? text : 'img',
				},
				[data.chatId + '.date']: currentTime,
			})
			setText('')
			setImg(null)
		}
	}
	// function setRef() {
	// 	console.log('clear')
	// 	RefFile.current.value = null
	// 	setImg(RefFile.current.value)
	// }
	// const BgFile = img ? `${URL.createObjectURL(img)}` : ''
	return (
		<View
			style={theme === 'white' ? styles.inputContainer : styles2.inputContainer}
		>
			<View style={theme === 'white' ? styles.inputBox : styles2.inputBox}>
				<TextInput
					value={text}
					onChangeText={setText}
					placeholder='Type Here...'
					style={theme === 'white' ? styles.inputI : styles2.inputI}
				/>
				<TouchableOpacity
					style={theme === 'white' ? styles.inputButton : styles2.inputButton}
				>
					<Image
						style={{ width: 35, height: 35 }}
						source={require('../../assets/img/addFile.png')}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={handleClick}
					style={theme === 'white' ? styles.inputBtn : styles2.inputBtn}
				>
					<Image
						style={{ width: 35, height: 35 }}
						source={require('../../assets/img/enter.png')}
					/>
				</TouchableOpacity>
			</View>
		</View>
	)
}
const styles2 = StyleSheet.create({
	inputContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	inputBox: {
		flexDirection: 'row',
		// maxWidth: '80%',
	},

	inputI: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		minWidth: '65%',
		padding: 10,
		backgroundColor: colors.dark.itemBg,
		color: colors.dark.text,
	},
	inputButton: {
		backgroundColor: colors.dark.back,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	inputBtn: {
		backgroundColor: colors.dark.back,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
})
const styles = StyleSheet.create({})
