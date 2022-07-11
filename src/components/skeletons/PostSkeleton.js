import React from 'react'

import { Divider, HStack, Skeleton, VStack } from 'native-base'

export default function PostSkeleton() {
  return (
    <>
      <VStack mx='4'>
        <HStack py='4'>
          <Skeleton size='10' rounded='full' startColor='gray.300' />
          <VStack mt='1' ml='4' w='84%'>
            <Skeleton h='3' w='150' rounded='full' startColor='gray.400' />
            <Skeleton.Text mt='4' startColor='gray.300' />
          </VStack>
        </HStack>
        <Divider />
      </VStack>
    </>
  )
}
