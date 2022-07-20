import React from 'react'

import { Center, HStack, Pressable, Icon, Text } from 'native-base'
import { MaterialCommunityIcons, MaterialIcons } from '@native-base/icons'

export default function Navbar({ page, navigation }) {
  return (
    <>
      <Center flex={1}></Center>
      <HStack bg='white' alignItems='center' safeAreaBottom shadow={6}>
        <Pressable opacity={page === 0 ? 1 : 0.5} py='2' flex={1} onPress={() => navigation.navigate('Home')}>
          <Center>
            <Icon color='black' size='md' as={MaterialCommunityIcons} name={page === 0 ? 'home' : 'home-outline'} />
            <Text color='black' fontSize='12'>Home</Text>
          </Center>
        </Pressable>
        <Pressable opacity={page === 1 ? 1 : 0.5} py='2' flex={1} onPress={() => navigation.navigate('Explore')}>
          <Center>
            <Icon color='black' size='md' as={MaterialIcons} name='search' />
            <Text color='black' fontSize='12'>Explore</Text>
          </Center>
        </Pressable>
        <Pressable opacity={page === 2 ? 1 : 0.6} py='2' flex={1} onPress={() => navigation.navigate('Stream')}>
          <Center>
            <Icon color='black' size='md' as={MaterialCommunityIcons} name={page === 2 ? 'play' : 'play-outline'} />
            <Text color='black' fontSize='12'>Stream</Text>
          </Center>
        </Pressable>
        <Pressable opacity={page === 3 ? 1 : 0.5} py='2' flex={1} onPress={() => navigation.navigate('Groups')}>
          <Center>
            <Icon color='black' size='md' as={MaterialCommunityIcons} name={page === 3 ? 'account-group' : 'account-group-outline'} />
            <Text color='black' fontSize='12'>Groups</Text>
          </Center>
        </Pressable>
        <Pressable opacity={page === 4 ? 1 : 0.5} py='2' flex={1} onPress={() => navigation.navigate('Profile')}>
          <Center>
            <Icon color='black' size='md' as={MaterialCommunityIcons} name={page === 4 ? 'account' : 'account-outline'} />
            <Text color='black' fontSize='12'>Profile</Text>
          </Center>
        </Pressable>
      </HStack>
    </>
  )
}
