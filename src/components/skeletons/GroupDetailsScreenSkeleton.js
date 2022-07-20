import React from 'react'

import { AppbarSkeleton } from '@root/components/skeletons'

import { Avatar, Divider, HStack, ScrollView, Text, VStack, Skeleton } from 'native-base'

export default function GroupDetailsScreenSkeleton() {
  return (
    <>
      <AppbarSkeleton />
      <ScrollView>
        <Skeleton h='200' startColor='gray.300' />
        <Skeleton mx='4' mt='4' h='7' w='90' rounded='full' startColor='gray.400' />
        <HStack mt='2' mx='4' space='2' alignItems='center'>
          <HStack space='1' alignItems='center'>
            <Skeleton h='4' w='6' rounded='full' startColor='gray.300' />
            <Skeleton h='4' w='70' rounded='full' startColor='gray.300' />
          </HStack>
          <Divider orientation='vertical' />
          <HStack space='1' alignItems='center'>
            <Skeleton h='4' w='6' rounded='full' startColor='gray.300' />
            <Skeleton h='4' w='41' rounded='full' startColor='gray.300' />
            <Skeleton h='4' w='59' rounded='full' startColor='gray.300' />
          </HStack>
        </HStack>
        <HStack mx='4'>
          <Avatar.Group mt='3' max='5'>
            {
              [...Array(5).keys()].map((_, idx) => <Skeleton h='47' w='47' rounded='full' startColor='gray.300' />)
              
            }
          </Avatar.Group>
        </HStack>
        <VStack mx='4' mt='4' p='3' rounded='md' bgColor='white'>
          <Text bold mb='1'>Description</Text>
          <Skeleton.Text mt='2' startColor='gray.300' />
        </VStack>
        <VStack mx='4' mt='4' p='3' pb='4' rounded='md' bgColor='white'>
          <Text bold>Leaders</Text>
          <HStack mt='4' mx='1' justifyContent='space-between'>
            {
              [...Array(4).keys()].map((_, idx) => 
                <VStack>
                  <Skeleton key={idx} h='70' w='70' rounded='full' startColor='gray.300' />
                  <Skeleton mt='2' h='4' w='70' rounded='full' startColor='gray.300' />
                </VStack>
              )
            }
          </HStack>
          <HStack mt='4' mx='1' justifyContent='space-between'>
            {
              [...Array(4).keys()].map((_, idx) => 
                <VStack>
                  <Skeleton key={idx} h='70' w='70' rounded='full' startColor='gray.300' />
                  <Skeleton mt='2' h='4' w='70' rounded='full' startColor='gray.300' />
                </VStack>
              )
            }
          </HStack>
        </VStack>
        <VStack mx='4' mt='4' p='3' pb='4' rounded='md' bgColor='white'>
          <Text bold>Members</Text>
          <HStack mt='4' mx='1' justifyContent='space-between'>
            {
              [...Array(4).keys()].map((_, idx) => 
                <VStack>
                  <Skeleton key={idx} h='70' w='70' rounded='full' startColor='gray.300' />
                  <Skeleton mt='2' h='4' w='70' rounded='full' startColor='gray.300' />
                </VStack>
              )
            }
          </HStack>
          <HStack mt='4' mx='1' justifyContent='space-between'>
            {
              [...Array(4).keys()].map((_, idx) => 
                <VStack>
                  <Skeleton key={idx} h='70' w='70' rounded='full' startColor='gray.300' />
                  <Skeleton mt='2' h='4' w='70' rounded='full' startColor='gray.300' />
                </VStack>
              )
            }
          </HStack>
        </VStack>
      </ScrollView>
    </>
  )
}
