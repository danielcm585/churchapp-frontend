import React, { useState } from 'react'

import { VStack, Pressable, Box, HStack, Avatar, Text, Divider } from 'native-base'

export default function ProfileItem({ profile, select, setSelected, navigation }) {
  const [ isSelected, setIsSelected ] = useState(false)

  return (
    <>
      <VStack>
        <Pressable bg={isSelected ? 'gray.200' : 'gray.100'} _pressed={{ bg: 'gray.200' }} onPress={() => {
          if (select) {
            setSelected(prev => {
              if (!isSelected) {
                prev.push(profile)
                return prev
              }
              return prev.filter(cur => cur.username != profile.username)
            })
            setIsSelected(prev => !prev)
          }
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
    </>
  )
}
