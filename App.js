import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

import { colors } from './assets/theme/color'
import { AuthContextProvider } from './app/context/AuthContext'
import Routing from './app/components/Routing'
import { ChatContextProvider } from './app/context/ChatContext'

export default function App() {
	return (
		<AuthContextProvider>
			<ChatContextProvider>
				<StatusBar backgroundColor={colors.dark.header} style='light' />
				<Routing />
			</ChatContextProvider>
		</AuthContextProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
