import React, { useEffect, useState } from 'react'

import { Appbar } from '../components'
import { ProfileDetailsSkeleton } from '../components/profile'

import { useToast } from 'native-base'
import { Avatar, HStack, Text, VStack } from 'native-base'

export default function ProfileDetailsScreen({ route, navigation }) {
  const { profileId } = route.params

  const [ profile, setProfile ] = useState(null)
  const toast = useToast()

  useEffect(async () => {
    try {
      const resp = await get(`/user/${profileId}`)
      if (resp.status >= 400) throw new Error(resp.data)
      setProfile(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom',
        status: 'error'
      })
    }

    return () => setProfile(null)

  }, [])

  if (profile == null) return <ProfileDetailsSkeleton />

  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
  const birthYear = parseInt(profile.birth.split('-')[0])
  const birthMonth = months[parseInt(profile.birth.split('-')[1]) - 1]
  const birthDate = parseInt(profile.birth.split('-')[2].split('T')[0])

  return (
    <>
      <Appbar title={profile.username} profile={profile} navigation={navigation} />
      <HStack mx='4' mt='4' alignItems='center'>
        <Avatar size='xl' source={{ uri: profile.photo }} />
        <VStack ml='4'>
          <Text fontSize='lg' fontWeight='bold'>{profile.name}</Text>
          <Text fontSize='sm' fontWeight='semibold'>{user.phone}</Text>
          <Text fontSize='sm' fontWeight='semibold'>{user.address}</Text>
          <Text fontSize='sm' fontWeight='semibold'>{birthDate} {birthMonth} {birthYear}</Text>
        </VStack>
      </HStack>
    </>
  )
}
