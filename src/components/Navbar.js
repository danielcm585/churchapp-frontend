import React from 'react'

import { Center, HStack, Pressable, Icon, Text } from 'native-base'
import { MaterialCommunityIcons, MaterialIcons } from '@native-base/icons'

export default function navbar({ page, setPage }) {
  return (
    <>
      <Center flex={1}></Center>
      <HStack bg='white' alignItems='center' safeAreaBottom shadow={6}>
        <Pressable opacity={page === 1 ? 1 : 0.5} py='2' flex={1} onPress={() => setPage(1)}>
          <Center>
            <Icon color='black' size='md' as={MaterialCommunityIcons} name={page === 1 ? 'home' : 'home-outline'} />
            <Text color='black' fontSize='12'>Home</Text>
          </Center>
        </Pressable>
        <Pressable opacity={page === 2 ? 1 : 0.5} py='2' flex={1} onPress={() => setPage(2)}>
          <Center>
            <Icon color='black' size='md' as={MaterialIcons} name='search' />
            <Text color='black' fontSize='12'>Explore</Text>
          </Center>
        </Pressable>
        <Pressable opacity={page === 3 ? 1 : 0.6} py='2' flex={1} onPress={() => setPage(3)}>
          <Center>
            <Icon color='black' size='md' as={MaterialCommunityIcons} name={page === 3 ? 'play' : 'play-outline'} />
            <Text color='black' fontSize='12'>Stream</Text>
          </Center>
        </Pressable>
        <Pressable opacity={page === 4 ? 1 : 0.5} py='2' flex={1} onPress={() => setPage(4)}>
          <Center>
            <Icon color='black' size='md' as={MaterialCommunityIcons} name={page === 4 ? 'account-group' : 'account-group-outline'} />
            <Text color='black' fontSize='12'>Groups</Text>
          </Center>
        </Pressable>
        <Pressable opacity={page === 5 ? 1 : 0.5} py='2' flex={1} onPress={() => setPage(5)}>
          <Center>
            <Icon color='black' size='md' as={MaterialCommunityIcons} name={page === 5 ? 'account' : 'account-outline'} />
            <Text color='black' fontSize='12'>Profile</Text>
          </Center>
        </Pressable>
      </HStack>
    </>
  )
}
