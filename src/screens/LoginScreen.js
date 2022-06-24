import React, { useState } from 'react'

import theme from '../../theme'
import config from '../../config'
import { post } from '../http'
import { setData } from '../utils'

import { Box, Button, Center, Divider, Heading, HStack, Icon, Image, Input, IconButton, ScrollView, Text, Link } from 'native-base'
import { useToast } from 'native-base'
import { MaterialCommunityIcons, MaterialIcons } from '@native-base/icons'

export default function LoginScreen({ navigation }) {
  const [ show, setShow ] = useState(false)

  const [ username, setUsername ] = useState()
  const [ password, setPassword ] = useState()

  const toast = useToast()
  const [ isLoading, setIsLoading ] = useState(false)
  const sendLogin = async () => {
    setIsLoading(true)
    const resp = await post(`${config.API_URL}/user/login`, { username, password })
    console.log(resp)
    if (resp.status >= 400) {
      toast.show({
        title: resp.message,
        placement: 'bottom',
        status: 'error'
      })
    }
    else {
      await setData('token', resp.token)
      await setData('refreshToken', resp.refreshToken)
    }
    setIsLoading(false)
  }

  return (
    <ScrollView>
      <Center>
        <Image width='330' height='330' alt='Login' source={require('../images/login.png')} />
      </Center>
      <Heading ml='6' size='2xl' color={theme.blue[900]}>Login</Heading>
      <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
        <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='person'></Icon>
        <Input w='89%' variant='underlined' placeholder='Username'
          _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setUsername(val)}
        />
      </HStack>
      <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
        <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='lock'></Icon>
        <Input w='89%' variant='underlined' placeholder='Password' type={!show && 'password'}
          _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setPassword(val)} 
          InputRightElement={<IconButton onPress={() => setShow(prev => !prev)}
          _icon={
            !show ?
              { color: theme.blue[900], as: MaterialCommunityIcons, name: 'eye' } :
              { color: theme.blue[900], as: MaterialCommunityIcons, name: 'eye-off' }
          } />}
        />
      </HStack>
      <HStack mt='3' ml='6' mr='6'>
        <Box w='67%'></Box>
        <Link _text={{ color: theme.blue[500] }} onPress={() => console.log('Forget password')}>
          <Text color={theme.blue[500]} fontWeight='bold'>
            Forget password?
          </Text>
        </Link>
      </HStack>
      <Button mt='4' ml='6' mr='6' borderRadius='lg' backgroundColor={theme.blue[500]}
        _pressed={{ backgroundColor: theme.blue[600] }} onPress={sendLogin} isLoading={isLoading}>
        <Text color='white'>Login</Text>
      </Button>
      <Center>
        <HStack mt='4' ml='6' mr='6' space='2' alignItems='center'>
          <Divider w='44%' />
          <Text color='gray.400'>OR</Text>
          <Divider w='44%' />
        </HStack>
      </Center>
      <Button mt='4' ml='6' mr='6' borderRadius='lg' variant='outline' backgroundColor='gray.100'
        startIcon={<Icon color='black' as={MaterialCommunityIcons} name='google'></Icon>}
        _pressed={{ backgroundColor: 'gray.200' }}>
        <Text color='black'>Login with Google</Text>
      </Button>
      <Center>
        <HStack mt='6'>
          <Text>New to MyKC? </Text>
          <Link _text={{ color: theme.blue[500] }} onPress={() => navigation.navigate('Register')}>
            <Text bold color={theme.blue[500]}>Register</Text>
          </Link>
        </HStack>
      </Center>
    </ScrollView>
  )
}
