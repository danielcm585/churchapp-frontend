import React from 'react'

import { HStack, Skeleton } from 'native-base'

export default function TimeStampSkeleton() {
  return (
    <>
      <HStack space='1'>
        <Skeleton rounded='full' h='2' w='5' startColor='gray.200' />
        <Skeleton rounded='full' h='2' w='10' startColor='gray.200' />
        <Skeleton rounded='full' h='2' w='8' startColor='gray.200' />
      </HStack>
    </>
  )
}
