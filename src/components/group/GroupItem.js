import React from 'react'

import theme from '../../../theme'

import { Avatar, VStack, Text, Button } from 'native-base'

export default function GroupItem({ navigation, group, mine }) {
  return (
    <>
      <VStack minHeight='228' py='5' rounded='md' backgroundColor='white'>
        <VStack minHeight='142' alignItems='center'>
          <Avatar h='16' w='16' source={{ uri: group.photo }} />
          <Text mt='2' noOfLines={1} fontSize='md' fontWeight='bold'>{group.name}</Text>
          <Text mx='6' mt='1' noOfLines={2} textAlign='center' fontWeight='semibold'>
            {group.description}
          </Text>
        </VStack>
        {
          mine ? (
            <Button mx='12' mt='3' size='sm' rounded='full' bgColor={theme.blue[500]} 
              _pressed={{ bgColor: theme.blue[600] }} onPress={() => navigation.navigate('Group', { groupId: group._id })}>
              <Text color='white'>View</Text>
            </Button>
          ) : (
            <Button mx='12' mt='3' size='sm' rounded='full' bgColor={theme.blue[500]} 
              _pressed={{ bgColor: theme.blue[600] }}>
              <Text color='white'>Join</Text>
            </Button>
          )
        }
      </VStack>
    </>
  )
}
