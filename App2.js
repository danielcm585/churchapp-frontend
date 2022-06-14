import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { getData } from './src/utils'
import { HomeScreen, LoginScreen, RegisterScreen } from './src/screens2'

import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { default as theme } from './theme.json'

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'

const Stack = createNativeStackNavigator()

export default function App() {
  const [ token, setToken ] = useState(null)

  const getToken = async () => {
    const myToken = await getData('token')
    setToken(myToken)
  }
  useEffect(() => getToken(), [])

  // const [ isDark, setIsDark ] = useState(false)
  // const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <>
      <StatusBar hidden />
      <IconRegistry icons={EvaIconsPack} />
      {/* <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}> */}
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator>
              {
                token ? (
                  <>
                    <Stack.Screen name='Home' component={HomeScreen} 
                      options={{ headerShown: false }} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name='Login' component={LoginScreen} 
                      options={{ headerShown: false }} />
                    <Stack.Screen name='Register' component={RegisterScreen} 
                      options={{ headerShown: false }} />
                  </>
                )
              }
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      {/* </ApplicationProvider> */}
    </>
  )
}