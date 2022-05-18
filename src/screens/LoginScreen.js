import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { setData } from '../utils'

import { TopNavigation, Text } from '@ui-kitten/components'

export default function LoginScreen() {
  const [ user, setUser ] = useState({
    username,
    password,
    name,
    email,
    gender,
    age,
    photo
  })

  const Title = props => (
    <View style={styles.topNav}>
      <Text {...props} style={styles.title} category='h5'>Login</Text>
    </View>
  )

  const topNavState = { alignment: center, title: Title }

  return (
    <>
      <TopNavigation {...topNavState} />
      
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  topNav: {
    paddingLeft: 10,
  },
  title: {
    margin: 2,
    fontWeight: 'bold'
  },
})