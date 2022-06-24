import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NativeBaseProvider } from 'native-base'

import { getData } from './src/utils'
import { HomeScreen, LoginScreen, RegisterScreen, GroupScreen, GroupDetailsScreen, ProfileScreen } from './src/screens'

const Stack = createNativeStackNavigator()

export default function App() {
  const [ token, setToken ] = useState(null)

  const getToken = async () => {
    const myToken = await getData('token')
    setToken(myToken)
  }
  useEffect(() => getToken(), [])
  
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {
            (token != null) ? (
              <>
                <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Group' component={GroupScreen} options={{ headerShown: false }} />
                <Stack.Screen name='GroupDetails' component={GroupDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
              </>
            ) : (
              <>
                <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
