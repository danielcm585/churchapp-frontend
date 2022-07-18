import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNetInfo } from '@react-native-community/netinfo'

import { getData } from './src/utils'

import { OfflineScreen, HomeScreen, ExploreScreen, StreamScreen, GroupsScreen, ProfileScreen, LoginScreen, RegisterScreen1, RegisterScreen2, GroupChatScreen, GroupDetailsScreen, ProfileChatScreen, ProfileDetailsScreen, NotificationScreen } from './src/screens'

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
                <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Explore' component={ExploreScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Stream' component={StreamScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Groups' component={GroupsScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
                
                <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Register1' component={RegisterScreen1} options={{ headerShown: false }} />
                <Stack.Screen name='Register2' component={RegisterScreen2} options={{ headerShown: false }} />
                
                <Stack.Screen name='GroupChat' component={GroupChatScreen} options={{ headerShown: false }} />
                <Stack.Screen name='GroupDetails' component={GroupDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ProfileChat' component={ProfileChatScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ProfileDetails' component={ProfileDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Notification' component={NotificationScreen} options={{ headerShown: false }} />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
