import React from 'react'

import { Appbar } from '../components'

import { Avatar, HStack, Text, VStack } from 'native-base'

export default function ProfileDetailsScreen({ route, navigation }) {
  const { profile } = route.params

  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
  const birthYear = parseInt(profile.birth.split('-')[0])
  const birthMonth = months[parseInt(profile.birth.split('-')[1]) - 1]
  const birthDate = parseInt(profile.birth.split('-')[2].split('T')[0])

  const isAdmin = true // FIXME: 

  return (
    <>
      <Appbar title={profile.username} profile={profile} navigation={navigation} />
      <HStack mx='4' mt='4' alignItems='center'>
        <Avatar size='xl' source={{ uri: profile.photo }} />
        <VStack ml='4'>
          <Text fontSize='lg' fontWeight='bold'>{profile.name}</Text>
          {
            isAdmin && <Text fontSize='sm' fontWeight='semibold'>{profile.phone}</Text>
          }
          <Text fontSize='sm' fontWeight='semibold'>{birthDate} {birthMonth} {birthYear}</Text>
        </VStack>
      </HStack>
    </>
  )
}
