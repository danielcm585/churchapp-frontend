import React from 'react'

import { Appbar } from '../'

import { Avatar, Center, VStack, Text, Button, Divider, Icon } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@native-base/icons'

export default function Profile() {
  const user = {
    name: 'Daniel Christian Mandolang',
    photo: 'https://i.ibb.co/B2cSS4q/download.png',
    phone: '+62 813 1323 3290',
    birth: '2012-04-23T18:25:43.511Z'
  }
  
  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
  const birthYear = parseInt(user.birth.split('-')[0])
  const birthMonth = months[parseInt(user.birth.split('-')[1])]
  const birthDate = parseInt(user.birth.split('-')[2].split('T')[0])

  return (
    <>
      <Appbar title='Profile' mainScreen={true} />
      <Center mt='8'>
        <VStack alignItems='center'>
          <Avatar size='2xl' source={{ uri: user.photo }} />
          <Text mt='4' fontSize='lg' fontWeight='bold'>{user.name}</Text>
          <Text fontSize='md' fontWeight='semibold'>{user.phone}</Text>
          <Text fontSize='md' fontWeight='semibold'>{birthDate} {birthMonth} {birthYear}</Text>
        </VStack>
      </Center>
      <VStack mx='4' mt='3'>
        <Button mt='1' variant='outline' rounded='md' bgColor='gray.100' _pressed={{ bgColor: 'gray.200' }}
          leftIcon={<Icon as={MaterialIcons} name='attach-money' color='black' />}
          onPress={() => console.log('TODO')}>
          <Text>Offering</Text>
        </Button>
        <Button mt='1' variant='outline' rounded='md' bgColor='gray.100' _pressed={{ bgColor: 'gray.200' }}
          leftIcon={<Icon as={MaterialCommunityIcons} name='hands-pray' color='black' />}
          onPress={() => console.log('TODO')}>
          <Text>Prayer Request</Text>
        </Button>
        <Button mt='1' variant='outline' rounded='md' bgColor='gray.100' _pressed={{ bgColor: 'gray.200' }}
          leftIcon={<Icon as={MaterialIcons} name='edit' color='black' />}
          onPress={() => console.log('TODO')}>
          <Text>Edit Profile</Text>
        </Button>
        <Button mt='1' variant='outline' rounded='md' bgColor='gray.100' _pressed={{ bgColor: 'gray.200' }}
          leftIcon={<Icon as={MaterialCommunityIcons} name='key-change' color='black' />}
          onPress={() => console.log('TODO')}>
          <Text>Change Password</Text>
        </Button>
        <Divider mt='4' />
        <Button mt='4' variant='outline' rounded='md' bgColor='gray.100' _pressed={{ bgColor: 'gray.200' }}
          leftIcon={<Icon as={MaterialIcons} name='phone' color='black' />}
          onPress={() => console.log('TODO')}>
          <Text>Contact Us</Text>
        </Button>
        <Button mt='1' variant='outline' rounded='md' bgColor='gray.100' _pressed={{ bgColor: 'gray.200' }}
          leftIcon={<Icon as={MaterialCommunityIcons} name='google' color='black' />}
          onPress={() => console.log('TODO')}>
          <Text>Connect Google</Text>
        </Button>
        <Button mt='1' variant='outline' rounded='md' bgColor='red.500' _pressed={{ bgColor: 'red.600' }}
          leftIcon={<Icon as={MaterialCommunityIcons} name='logout' color='white' />}
          onPress={() => console.log('TODO')}>
          <Text color='white'>Logout</Text>
        </Button>
      </VStack>
    </>
  )
}
