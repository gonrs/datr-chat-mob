import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ChatContext } from '../context/ChatContext'
import { db } from '../../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import MessageItem from './MessageItem'

export default function MessagesContainer() {
	const [rep, setrep] = useState(1)
	const { data } = useContext(ChatContext)
	const [messages, setMessages] = useState([])
	useEffect(() => {
		const onSub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
			doc.exists() && setMessages(doc.data().message)
		})
		if (messages.length > 0) {
			scrollViewRef.current.scrollToEnd({ animated: true })
		}
		return () => {
			onSub()
		}
	}, [data.chatId])
	const scrollViewRef = useRef(null)
	//

	useEffect(() => {
		if (messages.length > 0) {
			scrollViewRef.current.scrollToEnd({ animated: true })
		}
		setTimeout(() => {
			if (messages.length > 0) {
				scrollViewRef.current.scrollToEnd({ animated: true })
			}
		}, 250)
	}, [messages])
	return (
		<FlatList
			data={messages}
			ref={scrollViewRef}
			keyExtractor={(item, index) => index.toString()}
			renderItem={value => {
				return <MessageItem message={value} />
			}}
		/>
	)
}

const styles = StyleSheet.create({})
