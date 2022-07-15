import React, { useState } from 'react'

import theme from '../../../theme'
import { post } from '../../http'

import { PhotoUpload } from '../'

import { useToast } from 'native-base'
import { Button, Modal, Text, HStack, Icon, Input, Center, Image } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function NewPostModal({ isOpen, setIsOpen }) {
  const onClose = () => setIsOpen(false)

  const [ body, setBody ] = useState('')
  const [ photo, setPhoto ] = useState('')

  const [ isLoading, setIsLoading ] = useState(false)
  
  const validateInput = () => {
    if (body == null || body.length == 0) throw new Error('Post body cannot be empty')
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

  const createPost = async () => {
    try {
      setIsLoading(true)
      validateInput()
      const photoLink = await postPhoto(photo)
      const resp = await post('/post/', {
        body: body,
        photo: photoLink
      })
      if (resp.status >= 400) throw new Error(resp.data)
      setIsLoading(false)
      onClose()
      toast.show({
        title: 'Post created',
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
