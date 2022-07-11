import React, { useEffect, useState } from 'react'

import { Appbar } from '../components'
import { ProfileDetailsScreenSkeleton } from '../components/profile'

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
        placement: 'bottom'
      })
    }

    return () => setProfile(null)

  }, [])

  if (profile == null) return <ProfileDetailsScreenSkeleton />

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
          <Text fontSize='sm' fontWeight='semibold'>{profile.phone}</Text>
          <Text fontSize='sm' fontWeight='semibold'>{profile.address}</Text>
          <Text fontSize='sm' fontWeight='semibold'>{birthDate} {birthMonth} {birthYear}</Text>
        </VStack>
      </HStack>
    </>
  )
}
