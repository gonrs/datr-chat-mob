import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

import { colors } from './assets/theme/color'
import { AuthContextProvider } from './app/context/AuthContext'
import Routing from './app/components/Routing'

export default function App() {
	return (
		<AuthContextProvider>
			<StatusBar backgroundColor={colors.dark.header} style='light' />
			<Routing />
		</AuthContextProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
