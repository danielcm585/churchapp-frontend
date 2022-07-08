import { Center, Skeleton, VStack } from 'native-base'
import React from 'react'

export default function ProfileDetailsSkeleton() {
  return (
    <>
      <Center mt='8'>
        <VStack alignItems='center'>
          <Skeleton size='130' rounded='full' startColor='gray.300' />
          <Skeleton mt='6' h='4' w='200' rounded='full' startColor='gray.400' />
          <Skeleton mt='3' h='4' w='120' rounded='full' startColor='gray.300' />
          <Skeleton mt='3' h='3' w='160' rounded='full' startColor='gray.300' />
          <Skeleton mt='3' h='3' w='100' rounded='full' startColor='gray.300' />
        </VStack>
      </Center>
    </>
  )
}
