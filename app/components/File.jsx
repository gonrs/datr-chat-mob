import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/theme/color'

export default function File({ img, setImg, theme }) {
	return (
		<View style={theme === 'white' ? styles.fileCon : styles2.fileCon}>
			<TouchableOpacity
				onPress={() => {
					setImg(null)
				}}
			>
				<Text style={theme === 'white' ? styles.fileClose : styles2.fileClose}>
					Close
				</Text>
			</TouchableOpacity>
			<Image source={{ uri: img }} style={{ width: 200, height: 200 }} />
		</View>
	)
}

const styles2 = StyleSheet.create({
	fileCon: {
		gap: 5,
		padding: 10,
		backgroundColor: colors.dark.itemBg,
		borderRadius: 10,
		marginBottom: 5,
	},
	fileClose: {
		color: colors.dark.text,
	},
})
const styles = StyleSheet.create({})
