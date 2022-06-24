import React from 'react'

import theme from '../../theme'

import { Center, HStack, Icon, IconButton, Input } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function ChatInput({ body, setBody }) {
  return (
    <>
      <Center flex={1}></Center>
      <HStack w='100%' py='1' px='2' bg='white' alignItems='center' safeAreaBottom shadow={6}>
        <Input w='92%' h='9' rounded='full' value={body} onChangeText={val => setBody(val)} 
          _focus={{ borderColor: theme.blue[500], bgColor: 'white' }}
        />
        <IconButton icon={<Icon as={MaterialIcons} name='send' color={theme.blue[500]} />} />
      </HStack>
    </>
  )
}
