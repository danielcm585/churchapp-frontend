import React from 'react'

import theme from '../../theme'

import { Button, Text, VStack } from 'native-base'

export default function LoginButton({ navigation }) {
  return (
    <>
      <VStack mt='2' mx='4'>
        <Text>Please login to your account to use the full feature</Text>
        <Button mt='2' rounded='md' bgColor={theme.blue[500]} 
          onPress={() => navigation.navigate('Login')}>
          <Text color='white'>Login</Text>
        </Button>
        <Button mt='2' rounded='md' bgColor='gray.100' variant='outline' 
          onPress={() => navigation.navigate('Register1')}>
          <Text>Register</Text>
        </Button>
      </VStack>
    </>
  )
}
