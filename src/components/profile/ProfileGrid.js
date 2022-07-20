import React, { useState } from 'react'

import theme from '@root/theme'

import { VStack, HStack, Box, Avatar, Text, Link } from 'native-base'

export default function ProfileGrid({ profiles, navigation }) {
  const rows = []
  for (let i = 0; i < profiles.length; i += 4) {
    rows.push(profiles.slice(i, i+4))
  }
  
  const [ seeMore, setSeeMore ] = useState(false)

  return (
    <>
      <VStack mt='4' space='4'>
        {
          rows
            .filter((_, idx) => seeMore || idx < 2)
            .map((row, idx) => {
              const width = row.length == 2 ? '47%' : row.length == 3 ? '72%' : '100%'
              return (
                <HStack key={idx} w={width} mx='1' justifyContent='space-between'>
                  {
                    row.map((profile, idx) => (
                      <Link key={idx} onPress={() => navigation.navigate('ProfileDetails', { id: profile._id })}>
                        <VStack alignItems='center'>
                          <Avatar key={idx} h='70' w='70' source={{ uri: profile.photo }} />
                          <Text mt='2' isTruncated maxW='70' fontSize='xs'>{profile.name}</Text>
                        </VStack>
                      </Link>
                    ))
                  }
                </HStack>
              )
            })
        }
      </VStack>
      {
        (rows.length > 2) && (
          <HStack mt='3'>
            <Box w='84%' />
            <Link onPress={() => setSeeMore(prev => !prev)}>
              <Text fontSize='xs' fontWeight='bold' color={theme.blue[500]}>
                { !seeMore ? 'see more' : 'see less' }
              </Text>
            </Link>
          </HStack>
        )
      }
    </>
  )
}
