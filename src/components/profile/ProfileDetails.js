import React from 'react'

import { ProfileDetailsSkeleton } from './'

import { Center, VStack, Avatar, Text } from 'native-base'

export default function ProfileDetails({ user }) {
  if (user == null) return <ProfileDetailsSkeleton />

  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
  const birthYear = parseInt(user.birth.split('-')[0])
  const birthMonth = months[parseInt(user.birth.split('-')[1]) - 1]
  const birthDate = parseInt(user.birth.split('-')[2].split('T')[0])

  return (
    <>
      <Center mt='8'>
        <VStack alignItems='center'>
          <Avatar size='2xl' source={{ uri: user.photo }} />
          <Text mt='4' fontSize='lg' fontWeight='bold'>{user.name}</Text>
          <Text fontSize='md' fontWeight='semibold'>{user.phone}</Text>
          <Text fontSize='md' fontWeight='semibold'>{birthDate} {birthMonth} {birthYear}</Text>
        </VStack>
      </Center>
    </>
  )
}
