import React, { useState } from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'

import { setData } from '../utils'
import { post } from '../http'
import { API_URL } from '../../config'

import { Layout, Icon, Text, Input, Button, Spinner } from '@ui-kitten/components'

export default function LoginScreen() {
  const [ userData, setUserData ] = useState()

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  
  const [ isHidden, setIsHidden ] = useState(true)
  const togglePassword = (props) => (
    <TouchableWithoutFeedback onPress={() => setIsHidden(prev => !prev)}>
      <Icon {...props} name={isHidden ? 'eye-off' : 'eye'} />
  </TouchableWithoutFeedback>
  )

  const [ isLoading, setIsLoading ] = useState(false)
  const Loading = (props) => (
    <View style={[ props.style, styles.loading ]}>
      <Spinner size='small' />
    </View>
  )

  const sendLogin = async () => {
    console.log(`${username} ${password}`)
    setIsLoading(true)
    try {
      // const { 
      //   token, 
      //   refreshToken, 
      //   ...user 
      // }
      const resp = await post(API_URL+'/user/login', { username, password })
      // setUserData(user)
      // setData('token',token)
      // setData('refreshToken',refreshToken)
      console.log(resp)
      setIsLoading(false)
    } 
    catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  return (
    <>
      <Layout style={styles.screen}>
        <Image style={styles.image} source={require('../images/login.png')} />
        <Layout style={styles.form}>
          <Text style={styles.title} category='h1'>Login</Text>
          <Layout style={styles.space} />
          <Layout style={styles.space} />
          <Layout style={styles.space} />
          <Input style={styles.formField} label='Username'
            value={username} onChangeText={val => setUsername(val)} 
          />
          <Layout style={styles.space} />
          <Layout style={styles.space} />
          <Input style={styles.formField} label='Password'
            value={password} onChangeText={val => setPassword(val)} 
            accesssoryRight={togglePassword} secureTextEntry={isHidden} 
          />
          <Layout style={styles.space} />
          <Layout style={styles.space} />
          <Layout style={styles.space} />
          <Button style={styles.button} appearance={isLoading ? 'outline' : 'filled'}
            onPress={sendLogin}>
            { isLoading ? Loading : 'LOGIN' }
          </Button>
        </Layout>
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  form: {
    paddingLeft: 25, 
    paddingRight: 25, 
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  formField: {
    borderRadius: 15,
  },
  button: {
    borderRadius: 15,
    alignSelf: 'stretch'
  },
  space: {
    padding: 4,
  },
  topNav: {
    paddingLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    color: '#4669c1',
  },
  image: {
    width: 330,
    height: 330,
  },
  loading: {
    margin: 0,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
})