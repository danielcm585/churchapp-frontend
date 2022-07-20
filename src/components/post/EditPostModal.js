import React, { useState } from 'react'
import axios from 'axios'
import * as FileSystem from 'expo-file-system'

import theme from '@root/theme'
import config from '@root/config'
import { put } from '@root/http'

import { PhotoUpload } from '@root/components'

import { useToast } from 'native-base'
import { Button, Modal, Text, HStack, Icon, Input, Center, Image } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function EditPostModal({ post, isOpen, setIsOpen }) {
  const onClose = () => setIsOpen(false)

  const [ body, setBody ] = useState(post.body)
  const [ photo, setPhoto ] = useState(post.photo)

  const [ isLoading, setIsLoading ] = useState(false)
  
  const validateInput = () => {
    if (body == null || body.length === 0) throw new Error('Post body cannot be empty')
  }
  
  const toast = useToast()

  const postPhoto = async (photo) => {
    if (photo == null) return null
    let result = null
    const base64 = await FileSystem.readAsStringAsync(photo, { encoding: 'base64' })
    const form = new FormData()
    form.append('image',base64)
    try {
      const resp = await axios.create({
        headers: { },
        validateStatus: (stat) => true
      }).post(config.IMGBB_URL, form)
        .then(resp => resp.data.data)
      result = resp.display_url
    }
    catch(err) {
      toast.show({
        title: err.message,
        placement: 'bottom',
      })
    } 
    return result
  }

  const editPost = async () => {
    try {
      setIsLoading(true)
      validateInput()
      const photoLink = await postPhoto(photo)
      const resp = await put(`/post/${post._id}`, {
        body: body,
        photo: photoLink
      })
      if (resp.status >= 400) throw new Error(resp.data)
      setIsLoading(false)
      onClose()
      toast.show({
        title: 'Post edited',
        placement: 'bottom'
      })
    }
    catch (err) {
      setIsLoading(false)
      onClose()
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content minW='95%'>
          <Modal.CloseButton />
          <Modal.Header>Edit Post</Modal.Header>
          <Modal.Body p='4'>
            {
              (photo && photo.length > 0) && (
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
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={editPost}
                isLoading={isLoading} _pressed={{ bgColor: theme.blue[600] }}>
                <Text color='white'>Create</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
