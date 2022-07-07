import React, { useState } from 'react'

import theme from '../../../theme'

import { LongText } from '../'

import { Avatar, Divider, HStack, Link, Text, VStack } from 'native-base'

export default function PostItem({ navigation, post }) {
  const [ readMore, setReadMore ] = useState(false)

  return (
    <>
      <VStack mx='4'>
        <HStack py='4'>
          <Link onPress={() => navigation.navigate('ProfileDetails', { profile: post.creator })}>
            <Avatar size='10' source={{ uri: post.creator.photo }} />
          </Link>
          <VStack ml='4' w='84%'>
            <Link onPress={() => navigation.navigate('ProfileDetails', { profile: post.creator })}>
              <Text fontWeight='bold'>{post.creator.name}</Text>
            </Link>
            <LongText text={post.body} />
          </VStack>
        </HStack>
        <Divider />
      </VStack>
    </>
  )
}
