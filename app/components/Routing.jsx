import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../page/Login'
import Register from '../page/Register'
import Home from '../page/Home'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()
export default function Routing() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
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
				<Stack.Screen
					options={{ headerShown: false, animationEnabled: false }}
					name='Home'
					component={Home}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({})
