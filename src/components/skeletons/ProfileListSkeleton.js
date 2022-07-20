import React from 'react'

import { SearchBar } from '@root/components'

import { Skeleton, ScrollView, VStack, HStack, Divider } from 'native-base'

export default function ProfileListSkeleton() {
  return (
    <>
      <VStack w='100%'>
        <SearchBar keyword='' />
        <ScrollView mt='2'>
          {
            [...Array(10).keys()].map((_, idx) => (
              <VStack key={idx}>
                <HStack p='2' alignItems='center'>
                  <Skeleton h='10' w='10' rounded='full' startColor='gray.300' />
                  <VStack ml='3'>
                    <Skeleton h='3' w='100' rounded='full' startColor='gray.400' />
                    <Skeleton mt='2' h='3' w='70' rounded='full' startColor='gray.300' />
                  </VStack>
                </HStack>
                <Divider />
              </VStack>
            ))
          }
        </ScrollView>
      </VStack>
    </>
  )
}
