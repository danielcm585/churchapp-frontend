import React, { useState } from 'react'
// import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'
// import { Snackbar } from 'react-native-paper'

import { setData, getData } from '../utils'
import { post } from '../http'
import config from '../../config'

// import { Layout, Icon, Text, Input, Button, Spinner } from '@ui-kitten/components'

export default function LoginScreen() {
  const [ userData, setUserData ] = useState()

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  
  // const [ isHidden, setIsHidden ] = useState(true)
  // const togglePassword = (props) => (
  //   <TouchableWithoutFeedback onPress={() => setIsHidden(prev => !prev)}>
  //     <Icon {...props} name={isHidden ? 'eye-off' : 'eye'} />
  //   </TouchableWithoutFeedback>
  // )

  // const [ isLoading, setIsLoading ] = useState(false)
  // const Loading = (props) => (
  //   <View style={[ props.style, styles.loading ]}>
  //     <Spinner size='small' />
  //   </View>
  // )

  // const [ openToast, setOpenToast ] = useState(false)
  // const [ error, setError ] = useState('')

  const sendLogin = async () => {
    // console.log(`${username} ${password}`)
    setIsLoading(true)
    const resp = await post(`${config.API_URL}/user/login`, { username, password })
    if (resp.status >= 400) {
      // TODO: Show toast error
      // setError(err.data)
      // setOpenToast(true)
    }
    else {
      setUserData(resp)
      setData('token', resp.token)
      setData('refreshToken', resp.refreshToken)
    }
    setIsLoading(false)
  }

  return (
    <>
      {/* <Snackbar visible={openToast} duration="3000" 
        onDismiss={() => setOpenToast(false)}>
        {error}
      </Snackbar>
      <Layout style={styles.screen}>
        <Layout style={styles.space} />
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
          <Button style={styles.button} onPress={sendLogin}
            appearance={isLoading ? 'outline' : 'filled'}>
            { isLoading ? Loading : 'LOGIN' }
          </Button>
        </Layout>
      </Layout> */}
    </>
  )
}

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1, 
//     justifyContent: 'flex-start', 
//     alignItems: 'center'
//   },
//   form: {
//     paddingLeft: 25, 
//     paddingRight: 25, 
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start'
//   },
//   formField: {
//     borderRadius: 15,
//   },
//   button: {
//     borderRadius: 15,
//     alignSelf: 'stretch'
//   },
//   space: {
//     padding: 4,
//   },
//   topNav: {
//     paddingLeft: 10,
//   },
//   title: {
//     fontWeight: 'bold',
//     color: '#4669c1',
//   },
//   image: {
//     width: 330,
//     height: 330,
//   },
//   loading: {
//     margin: 0,
//     color: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })