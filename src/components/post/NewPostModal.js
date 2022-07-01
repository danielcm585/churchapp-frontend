import React, { useState } from 'react'

import theme from '../../../theme'

import { PhotoUpload } from '../'

import { Button, Modal, Text, HStack, Icon, Input, Center, Image } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function NewPostModal({ isOpen, setIsOpen }) {
  const [ body, setBody ] = useState('')
  const [ photo, setPhoto ] = useState('')

  const createPost = () => {
    // TODO: POST new post
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content minW='95%'>
          <Modal.CloseButton />
          <Modal.Header>Create New Post</Modal.Header>
          <Modal.Body p='4'>
            {
              (photo.length > 0) && (
                <Center mb='4'>
                  <Image width='250' height='250' alt='Group Photo' source={{ uri: photo }} />
                </Center>
              )
            }
            <HStack space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='description'></Icon>
              <Input w='89%' variant='underlined' placeholder='Post Body' value={body}
                _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setBody(val)}
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
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={createPost}
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