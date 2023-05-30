import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useContext } from 'react'
import { useColor } from '../hooks/useColor'
import { AuthContext } from '../context/AuthContext'
import { colors } from '../../assets/theme/color'

export default function Input() {
	const { currentUser } = useContext(AuthContext)
	const { theme } = useColor(currentUser)
	return (
		<View
			style={theme === 'white' ? styles.inputContainer : styles2.inputContainer}
		>
			<View style={theme === 'white' ? styles.inputBox : styles2.inputBox}>
				<TextInput
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
