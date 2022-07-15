import React, { useState } from 'react'

import theme from '../../../theme'
import { post } from '../../http'

import { useToast } from 'native-base'
import { Avatar, VStack, Text, Button } from 'native-base'

export default function GroupItem({ navigation, group, mine }) {
  const [ isLoading, setIsLoading ] = useState(false)

  const toast = useToast()

  const sendRequest = async () => {
    try {
      setIsLoading(true)
      const resp = await post(`/group/join/${group._id}`)
      if (resp.status >= 400) throw new Error(resp.data)
      setIsLoading(false)
      toast.show({
        title: 'Request sent',
        placement: 'bottom'
      })
    }
    catch (err) {
      setIsLoading(false)
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }
  
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
              _pressed={{ bgColor: theme.blue[600] }} onPress={() => navigation.navigate('Group', { id: group._id })}>
              <Text color='white'>View</Text>
            </Button>
          ) : (
            <Button mx='12' mt='3' size='sm' rounded='full' bgColor={theme.blue[500]} 
              isLoading={isLoading} _pressed={{ bgColor: theme.blue[600] }} onPress={sendRequest}>
              <Text color='white'>Join</Text>
            </Button>
          )
        }
      </VStack>
    </>
  )
}
