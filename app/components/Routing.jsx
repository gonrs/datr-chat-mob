import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../page/Login'
import Register from '../page/Register'
import Home from '../page/Home'
import Messages from '../page/Messages'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import Settings from '../page/Settings'
import { useColor } from '../hooks/useColor'

const Stack = createStackNavigator()
export default function Routing() {
	const { currentUser } = useContext(AuthContext)
	const { theme } = useColor(currentUser)
	// console.log(currentUser)
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
							initialParams={{ theme }}
							component={Home}
						/>
						<Stack.Screen
							options={{ headerShown: false, animationEnabled: false }}
							name='Settings'
							// initialParams={{ theme: theme }}
							component={Settings}
						/>
						<Stack.Screen
							options={{ headerShown: false, animationEnabled: false }}
							name='Messages'
							// initialParams={{ theme: theme }}
							component={Messages}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({})
