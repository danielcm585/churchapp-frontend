import React, { useState } from 'react'

import theme from '../../theme'
import { post } from '../http'
import { setData } from '../utils'

import { PasswordInput, Appbar } from '../components'

import { useToast } from 'native-base'
import { Button, Center, Heading, HStack, Icon, Image, Input, Text, Link, ScrollView } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function RegisterPage1({ navigation }) {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPass, setConfirmPass ] = useState('')

  const [ isLoading, setIsLoading ] = useState(false)
  
  const validateInput = () => {
    if (username == null || username.length == 0) throw new Error('Username cannot be empty')
    if (password == null || password.length == 0) throw new Error('Password cannot be empty')
    if (confirmPass == null || confirmPass.length == 0) throw new Error('Please confirm your password')
    if (password != confirmPass) throw new Error('Password and confirm password do not match')
  }

  const toast = useToast()

  const sendRegister = async () => {
    try {
      setIsLoading(true)
      validateInput()
      const resp = await post('/user/register', {
        username: username,
        password: password
      })
      if (resp.status >= 400) throw new Error(resp.data)
      setIsLoading(false)
      await setData('user', JSON.stringify(resp.data.user))
      await setData('token', resp.data.token)
      await setData('refreshToken', resp.data.refreshToken)
      navigation.navigate('Register2')
    }
    catch (err) {
      setIsLoading(false)
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }

  return (
    <>
      <Appbar title='Register' navigation={navigation} />
      <ScrollView>
        <Center>
          <Image width='300' height='300' alt='Register' source={require('../images/register.png')} />
        </Center>
        <Heading ml='6' size='2xl' color={theme.blue[900]}>Register</Heading>
        <HStack mt='4' mx='6' space='4' alignItems='center'>
          <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='person'></Icon>
          <Input w='89%' variant='underlined' placeholder='Username' color={theme.blue[900]}
            _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setUsername(val)} value={username}
          />
        </HStack>
        <PasswordInput value={password} setValue={setPassword} placeholder='Password' icon='lock' />
        <PasswordInput value={confirmPass} setValue={setConfirmPass} placeholder='Confirm Password' icon='lock-check' />
        <HStack mt='4' mx='6'>
          <Text color='gray.500'>By signing up, you're agree to the </Text>
          <Link>
            <Text color={theme.blue[500]} fontWeight='bold'>
              Terms & Conditions
            </Text>
          </Link>
        </HStack>
        <HStack mx='6'>
          <Text color='gray.500'>and </Text>
          <Link>
            <Text color={theme.blue[500]} fontWeight='bold'>
              Privacy Policy
            </Text>
          </Link>
        </HStack>
        <Button mt='6' mx='6' borderRadius='lg' backgroundColor={theme.blue[500]}
          _pressed={{ backgroundColor: theme.blue[600] }} onPress={sendRegister} isLoading={isLoading}>
          <Text color='white'>Continue</Text>
        </Button>
        <Center>
          <HStack mt='6'>
            <Text>Joined us before? </Text>
            <Link _text={{ color: theme.blue[500] }} onPress={() => navigation.navigate('Login')}>
              <Text bold color={theme.blue[500]}>Login</Text>
            </Link>
          </HStack>
        </Center>
      </ScrollView>
    </>
  )
}
