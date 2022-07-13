import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNetInfo } from '@react-native-community/netinfo'

import { getData } from './src/utils'

import { OfflineScreen, HomeScreen, LoginScreen, RegisterScreen, GroupScreen, GroupDetailsScreen, ProfileScreen, ProfileDetailsScreen, NotificationScreen } from './src/screens'

import { NativeBaseProvider } from 'native-base'

const Stack = createNativeStackNavigator()

export default function App() {
  const netInfo = useNetInfo()

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const getToken = async () => {
    const myToken = await getData('refreshToken')
    if (myToken != null) setIsLoggedIn(true)
  }
  useEffect(() => getToken(), [])
  
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {
            !netInfo.isConnected ? (
              <Stack.Screen name='Offline' component={OfflineScreen} options={{ headerShown: false }} />
            ) : (
              <>
                {
                  isLoggedIn ? (
                    <>
                      <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
                      <Stack.Screen name='Group' component={GroupScreen} options={{ headerShown: false }} />
                      <Stack.Screen name='GroupDetails' component={GroupDetailsScreen} options={{ headerShown: false }} />
                      <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
                      <Stack.Screen name='ProfileDetails' component={ProfileDetailsScreen} options={{ headerShown: false }} />
                      <Stack.Screen name='Notification' component={NotificationScreen} options={{ headerShown: false }} />
                    </>
                  ) : (
                    <>
                      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                      <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
                    </>
                  )
                }
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
