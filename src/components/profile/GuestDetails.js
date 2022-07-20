import React from 'react'

import { Center, VStack, Avatar, Text } from 'native-base'

export default function GuestDetails() {
  return (
    <>
      <Center mt='8'>
        <VStack alignItems='center'>
          <Avatar size='2xl' source={{ uri: 'https://i.ibb.co/B2cSS4q/download.png' }} />
          <Text mt='4' fontSize='lg' fontWeight='bold'>Guest</Text>
        </VStack>
      </Center>
    </>
  )
}
