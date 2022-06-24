import React, { useState } from 'react'

import theme from '../../../theme'
import config from '../../../config'
import { post } from '../../http'

import { Button, Center, Heading, HStack, Icon, Image, Input, IconButton, Text, Link, ScrollView } from 'native-base'
import { useToast } from 'native-base'
import { MaterialCommunityIcons, MaterialIcons } from '@native-base/icons'

export default function LoginScreen({ navigation, setPage }) {
  const [ show, setShow ] = useState(false)

  const [ email, setEmail ] = useState()
  const [ username, setUsername ] = useState()
  const [ password, setPassword ] = useState()

  const toast = useToast()
  const [ isLoading, setIsLoading ] = useState(false)
  const sendRegister = async () => {
    setIsLoading(true)
    const resp = await post(`${config.API_URL}/user/register`, { email, username, password })
    console.log(resp)
    if (resp.status >= 400) {
      toast.show({
        title: resp.message,
        placement: 'bottom',
        status: 'error'
      })
      setIsLoading(false)
    }
    else {
      setIsLoading(false)
      setPage(prev => prev+1)
    }
  }

  return (
    <ScrollView>
      <Center>
        <Image width='330' height='330' alt='Register' source={require('../../images/register.png')} />
      </Center>
      <Heading ml='6' size='2xl' color={theme.blue[900]}>Register</Heading>
      <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
        <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='email'></Icon>
        <Input w='89%' variant='underlined' placeholder='Email' color={theme.blue[900]} 
          _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setEmail(val)}
        />
      </HStack>
      <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
        <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='person'></Icon>
        <Input w='89%' variant='underlined' placeholder='Username' color={theme.blue[900]} 
          _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setUsername(val)}
        />
      </HStack>
      <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
        <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='lock'></Icon>
        <Input w='89%' variant='underlined' placeholder='Password' color={theme.blue[900]} 
          _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setPassword(val)} 
          type={!show && 'password'} InputRightElement={<IconButton onPress={() => setShow(prev => !prev)}
          _icon={
            !show ?
            { color: theme.blue[900], as: MaterialCommunityIcons, name: 'eye' } :
            { color: theme.blue[900], as: MaterialCommunityIcons, name: 'eye-off' }
          } />}
        />
      </HStack>
      <HStack mt='4' ml='6' mr='6'>
        <Text color='gray.500'>By signing up, you're agree to the </Text>
        <Link>
          <Text color={theme.blue[500]} fontWeight='bold'>
            Terms & Conditions
          </Text>
        </Link>
      </HStack>
      <HStack ml='6' mr='6'>
        <Text color='gray.500'>and </Text>
        <Link>
          <Text color={theme.blue[500]} fontWeight='bold'>
            Privacy Policy
          </Text>
        </Link>
      </HStack>
      <Button mt='6' ml='6' mr='6' borderRadius='lg' backgroundColor={theme.blue[500]}
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
  )
}
