import React from 'react'

import { Skeleton, ScrollView, VStack, HStack, Divider } from 'native-base'
import { SearchBar } from '../'

export default function ProfileListSkeleton() {
  return (
    <>
      <SearchBar />
      <ScrollView mt='2'>
        {
          [...Array(15).keys()].map((_, idx) => (
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
    </>
  )
}
