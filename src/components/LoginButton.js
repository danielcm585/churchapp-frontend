import React from 'react'

import theme from '@root/theme'

import { Button, Text, VStack, HStack } from 'native-base'

export default function LoginButton({ navigation }) {
  return (
    <>
      <VStack mt='2' mx='4' p='4' rounded='md' bgColor='white'>
        <Text semibold fontSize='md' textAlign='center'>Please login to your account to use the full feature</Text>
        <HStack w='100%' mt='2' justifyContent='space-between'>
          <Button w='48%' rounded='md' bgColor='gray.100' variant='outline' 
            onPress={() => navigation.navigate('Register1')}>
            <Text>Register</Text>
          </Button>
          <Button w='48%' rounded='md' bgColor={theme.blue[500]} 
            onPress={() => navigation.navigate('Login')}>
            <Text color='white'>Login</Text>
          </Button>
        </HStack>
      </VStack>
    </>
  )
}
