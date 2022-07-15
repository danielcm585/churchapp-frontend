import React from 'react'

import { LongText } from '../'

import { Avatar, Divider, HStack, Link, Text, VStack, Image } from 'native-base'

export default function PostItem({ navigation, post }) {
  return (
    <>
      <VStack mx='4'>
        <HStack py='4'>
          <Link onPress={() => navigation.navigate('ProfileDetails', { id: post.creator._id })}>
            <Avatar size='10' source={{ uri: post.creator.photo }} />
          </Link>
          <VStack ml='4' w='84%'>
            <Link onPress={() => navigation.navigate('ProfileDetails', { id: post.creator._id })}>
              <Text fontWeight='bold'>{post.creator.name}</Text>
            </Link>
            {
              (post.photo != null) && 
                <Image mt='1' mb='1' minWidth='200' minHeight='200' maxWidth='300' maxHeight='300' alt="Photo" source={{ uri: post.photo }} />
            }
            <LongText text={post.body} />
          </VStack>
        </HStack>
        <Divider />
      </VStack>
    </>
  )
}
