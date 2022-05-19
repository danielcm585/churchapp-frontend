import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { Layout, Icon, Text, Input } from '@ui-kitten/components'
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport'

export default function LoadingScreen() {
  const [ username, setUsername ] = useState()
  const [ password, setPassword ] = useState()
  
  const [ isHidden, setIsHidden ] = useState(true)
  const togglePassword = (props) => (
    <TouchableWithoutFeedback onPress={() => setIsHidden(prev => !prev)}>
      <Icon {...props} name={isHidden ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  )

  return (
    <>
      <Layout style={styles.screen}>
        <Input value={username} onChange={val => setUsername(val)} />
        <Input value={password} onChange={val => setPassword(val)} 
          accesssoryRight={togglePassword} secureTextEntry={isHidden} 
        />
      </Layout>
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
  passwordField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})