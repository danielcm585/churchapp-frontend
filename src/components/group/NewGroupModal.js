import React, { useState } from 'react'

import theme from '../../../theme'

import { PhotoUpload } from '../'

import { Button, Modal, Text, HStack, Icon, Input, Center, Avatar } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function NewGroupModal({ isOpen, setIsOpen }) {
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ photo, setPhoto ] = useState('')

  const createGroup = () => {
    // TODO: POST new group
  }

  console.log('WOY')

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content minW='95%'>
          <Modal.CloseButton />
          <Modal.Header>Create New Group</Modal.Header>
          <Modal.Body p='4'>
            <Center>
              <Avatar size='xl' source={{ uri: photo }}>-</Avatar>
            </Center>
            <HStack mt='4' space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='person'></Icon>
              <Input w='89%' variant='underlined' placeholder='Group Name' value={name}
                _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setName(val)}
              />
            </HStack>
            <HStack mt='4' space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='description'></Icon>
              <Input w='89%' variant='underlined' placeholder='Group Description' value={description}
                _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setDescription(val)}
              />
            </HStack>
            <PhotoUpload mt='4' pressedBgColor='gray.100' setLink={setPhoto} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space='2'>
              <Button size='sm' rounded='md' variant='outline' onPress={() => setIsOpen(false)}
                _pressed={{ bgColor: 'gray.200' }}>
                <Text color='black'>Cancel</Text>
              </Button>
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={createGroup}
                _pressed={{ bgColor: theme.blue[600] }}>
                <Text color='white'>Create</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
