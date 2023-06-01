import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/theme/color'

export default function Loading() {
	theme = 'dark'
	return (
		<View style={theme === 'white' ? styles2.container : styles.container}>
			<Text style={theme === 'white' ? styles2.text : styles.text}>
				Loading...
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.dark.bg,
	},
	text: {
		fontSize: 30,
	},
})
const styles2 = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white.bg,
	},
	text: {
		fontSize: 30,
	},
})
