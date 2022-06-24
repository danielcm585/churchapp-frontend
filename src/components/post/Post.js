import React, { useState } from 'react'

import theme from '../../../theme'

import { LongText } from '../'

import { Avatar, Box, Divider, HStack, Link, Text, VStack } from 'native-base'

export default function Post({ post }) {
  const [ readMore, setReadMore ] = useState(false)

  return (
    <>
      <VStack mx='4'>
        <HStack py='4'>
          <Avatar size='10' source={{ uri: post.creator.photo }} />
          <VStack ml='4' w='84%'>
            <Text fontWeight='bold'>{post.creator.name}</Text>
            <LongText text={post.body} />
          </VStack>
        </HStack>
        <Divider />
      </VStack>
    </>
  )
}
