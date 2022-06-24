import React, { useEffect, useState } from 'react'

import { SearchBar } from '../'
import { ProfileListSkeleton } from './'

import { Avatar, Box, Divider, HStack, ScrollView, VStack, Text, Pressable } from 'native-base'

export default function ProfileList({ profiles, select, setSelected, navigation }) {
  if (profiles == null) return <ProfileListSkeleton />

  const [ keyword, setKeyword ] = useState('')
  const [ filtered, setFiltered ] = useState()
  useEffect(() => {
    const filteredProfiles = profiles.filter(profile => profile.name.toLowerCase().includes(keyword.toLowerCase()))
    setFiltered(filteredProfiles)
  }, [ keyword ])

  if (filtered == null) return <ProfileListSkeleton />

  return (
    <>
      <VStack mx='4'>
        <VStack mt='2'>
          <SearchBar keyword={keyword} setKeyword={setKeyword} />
        </VStack>
        <ScrollView mt='2'>
          {
            filtered.map((profile, idx) => (
              <VStack key={idx}>
                <Pressable _pressed={{ bg: 'gray.200' }} onPress={() => {
                  if (select) setSelected(profile)
                  else navigation.navigate('Profile', { profile: profile })
                }}>
                  <Box p='2'>
                    <HStack alignItems='center'>
                      <Avatar h='10' w='10' source={{ uri: profile.photo }} />
                      <VStack ml='3'>
                        <Text bold>{profile.name}</Text>
                        <Text color='gray.500'>{profile.username}</Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Pressable>
                <Divider />
              </VStack>
            ))
          }
        </ScrollView>
      </VStack>
    </>
  )
}
