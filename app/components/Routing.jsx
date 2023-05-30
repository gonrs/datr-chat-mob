import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../page/Login'
import Register from '../page/Register'
import Home from '../page/Home'
import Messages from '../page/Messages'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'

const Stack = createStackNavigator()
export default function Routing() {
	const { currentUser } = useContext(AuthContext)
	console.log(currentUser)
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{!currentUser ? (
					<>
						<Stack.Screen
							options={{ headerShown: false, animationEnabled: false }}
							name='Login'
							component={Login}
						/>
						<Stack.Screen
							options={{ headerShown: false, animationEnabled: false }}
							name='Register'
							component={Register}
						/>
					</>
				) : (
					<>
						<Stack.Screen
							options={{ headerShown: false, animationEnabled: false }}
							name='Home'
							component={Home}
						/>
						<Stack.Screen
							options={{ headerShown: false, animationEnabled: false }}
							name='Messages'
							component={Messages}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({})
