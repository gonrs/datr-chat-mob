import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './app/page/Login'
import { colors } from './assets/theme/color'
import Register from './app/page/Register'
import { AuthContextProvider } from './app/context/AuthContext'
import Home from './app/page/Home'

const Stack = createStackNavigator()
export default function App() {
	return (
		<AuthContextProvider>
			<NavigationContainer>
				<StatusBar backgroundColor={colors.dark.header} style='light' />
				<Stack.Navigator>
					<Stack.Screen
						options={{ headerShown: false, animationEnabled: false }}
						name='Home'
						component={Home}
					/>
					<Stack.Screen
						options={{ headerShown: false, animationEnabled: false }}
						name='Register'
						component={Register}
					/>
					<Stack.Screen
						options={{ headerShown: false, animationEnabled: false }}
						name='Login'
						component={Login}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</AuthContextProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
