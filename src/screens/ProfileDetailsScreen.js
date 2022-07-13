import React, { useEffect, useState } from 'react'

import theme from '../../theme'
import { get } from '../http'

import { Appbar } from '../components'
import { AppbarSkeleton } from '../components/skeletons'

import { useToast } from 'native-base'
import { Avatar, HStack, Text, VStack, Button } from 'native-base'

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

  // if (profile == null) return <ProfileDetailsScreenSkeleton />

  const [ birthYear, setBirthYear ] = useState()
  const [ birthMonth, setBirthMonth ] = useState()
  const [ birthDate, setBirthDate ] = useState()

  useEffect(() => {
    if (profile == null) return
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
    const profileBirthYear = parseInt(profile.birth.split('-')[0])
    const profileBirthMonth = months[parseInt(profile.birth.split('-')[1]) - 1]
    const profileBirthDate = parseInt(profile.birth.split('-')[2].split('T')[0])
    setBirthYear(profileBirthYear)
    setBirthMonth(profileBirthMonth)
    setBirthDate(profileBirthDate)
  }, [ profile ])

  return (
    <>
      {
        (profile != null) ? (
          <>
            <Appbar title={profile.username} profile={profile} navigation={navigation} />
            <HStack mx='4' mt='6' alignItems='center'>
              <Avatar size='xl' source={{ uri: profile.photo }} />
              <VStack ml='4'>
                <Text fontSize='lg' fontWeight='bold'>{profile.name}</Text>
                <Text fontSize='sm'>{profile.phone}</Text>
                <Text fontSize='sm'>{profile.address}</Text>
                <Text fontSize='sm'>{birthDate} {birthMonth} {birthYear}</Text>
              </VStack>
            </HStack>
            <HStack w='100%' mx='4' mt='6' space='2'>
              <Button w='45%' rounded='md' bgColor={theme.blue[500]}>
                <Text color='white'>Follow</Text>
              </Button>
              <Button w='45%' rounded='md' bgColor='gray.100' variant='outline' onPress={() => navigation.navigate('Profile', { profileId: profileId })}>
                <Text>Message</Text>
              </Button>
            </HStack>
          </>
        ) : (
          <AppbarSkeleton navigation={navigation} />
        )
      }    
    </>
  )
}
