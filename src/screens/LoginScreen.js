import React, { useState } from 'react'

import theme from '@root/theme'
import { post } from '@root/http'
import { setData } from '@root/utils'

import { Appbar, PasswordInput } from '@root/components'
import { ForgetPasswordModal } from '@root/components/user'

import { useToast } from 'native-base'
import { Box, Button, Center, Divider, Heading, HStack, Icon, Image, Input, ScrollView, Text, Link } from 'native-base'
import { MaterialCommunityIcons, MaterialIcons } from '@native-base/icons'

export default function LoginScreen({ navigation }) {
  const [ username, setUsername ] = useState()
  const [ password, setPassword ] = useState()

  const [ isLoading, setIsLoading ] = useState(false)
  
  const validateInput = () => {
    if (username == null || username.length === 0) throw new Error('Username cannot be empty')
    if (password == null || password.length === 0) throw new Error('Password cannot be empty')
  }
  
  const toast = useToast()

  const sendLogin = async () => {
    try {
      setIsLoading(true)
      validateInput()
      const resp = await post('/user/login', { 
        username: username, 
        password: password
      })
      if (resp.status >= 400) throw new Error(resp.data)
      setIsLoading(false)
      await setData('user', JSON.stringify(resp.data.user))
      await setData('token', resp.data.token)
      await setData('refreshToken', resp.data.refreshToken)
      navigation.navigate('Home')
    }
    catch (err) {
      setIsLoading(false)
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }

  const [ openForgetPass, setOpenForgetPass ] = useState(false)

  return (
    <>
      <Appbar title='Login' navigation={navigation} />
      <ScrollView>
        <Center>
          <Image width='300' height='300' alt='Login' source={require('@root/images/login.png')} />
        </Center>
        <Heading ml='6' size='2xl' color={theme.blue[900]}>Login</Heading>
        <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
          <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='person'></Icon>
          <Input w='89%' variant='underlined' placeholder='Username'
            _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setUsername(val)}
          />
        </HStack>
        <PasswordInput value={password} setValue={setPassword} placeholder='Password' icon='lock' />
        <HStack mt='3' ml='6' mr='6'>
          <Box w='67%'></Box>
          <Link _text={{ color: theme.blue[500] }} onPress={() => setOpenForgetPass(true)}>
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
            <Link _text={{ color: theme.blue[500] }} onPress={() => navigation.navigate('Register1')}>
              <Text bold color={theme.blue[500]}>Register</Text>
            </Link>
          </HStack>
        </Center>
      </ScrollView>
      <ForgetPasswordModal isOpen={openForgetPass} setIsOpen={setOpenForgetPass} />
    </>
  )
}
