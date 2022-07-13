import React from 'react'

import { SearchBar } from '../'

import { Center, ScrollView, Skeleton, VStack, HStack } from 'native-base'

export default function GroupListSkeleton() {
  return (
    <>
      <VStack mx='4' mb='2'>
        <SearchBar keyword='' />
      </VStack>
      <ScrollView mt='2'>
        <Center w='100%' mx='4'>
          <VStack w='100%' space='2'>
            {
              [...Array(10).keys()].map((_, idx) => (
                <HStack key={idx} w='100%' space='2'>
                  <VStack w='45%'>
                    <Skeleton h='228' rounded='md' startColor='gray.200' />
                    <Center mt='-210' mb='19'>
                      <Skeleton size='16' rounded='full' startColor='gray.300' />
                      <Skeleton mt='4' h='3' w='100' rounded='full' startColor='gray.400' />
                      <Skeleton.Text mt='4' px='4' alignItems='center' lines='2' startColor='gray.300' />
                      <Skeleton mt='4' h='9' w='90' rounded='full' startColor='gray.400' />
                    </Center>
                  </VStack>
                  <VStack w='45%'>
                    <Skeleton h='228' rounded='md' startColor='gray.200' />
                    <Center mt='-210' mb='19'>
                      <Skeleton size='16' rounded='full' startColor='gray.300' />
                      <Skeleton mt='4' h='3' w='100' rounded='full' startColor='gray.400' />
                      <Skeleton.Text mt='4' px='4' alignItems='center' lines='2' startColor='gray.300' />
                      <Skeleton mt='4' h='9' w='90' rounded='full' startColor='gray.400' />
                    </Center>
                  </VStack>
                </HStack>
              ))
            }
          </VStack>
        </Center>
      </ScrollView>
    </>
  )
}
