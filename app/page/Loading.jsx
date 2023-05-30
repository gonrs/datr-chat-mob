import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/theme/color'

export default function Loading() {
	return (
		<View style={styles.container}>
			<Image source={require('../../assets/icon1.png')} />
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
})
