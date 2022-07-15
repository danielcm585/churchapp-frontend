import React, { useState } from 'react'

import theme from '../../../theme'
import config from '../../../config'
import { put } from '../../http'

import { PhotoUpload } from '..'

import { useToast } from 'native-base'
import { Button, Modal, Text, HStack, Icon, Input, Center, Avatar } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function EditGroupModal({ group, isOpen, setIsOpen }) {
  const [ name, setName ] = useState(group.name)
  const [ description, setDescription ] = useState(group.description)
  const [ photo, setPhoto ] = useState(group.photo)

  const toast = useToast()

  const postPhoto = async (photo) => {
    if (photo == null) return null
    let result = null
    const base64 = await FileSystem.readAsStringAsync(photo, { encoding: 'base64' })
    const form = new FormData()
    form.append('image',base64)
    try {
      console.log('POST PHOTO TO IMGBB')
      const resp = await axios.create({
        headers: { },
        validateStatus: (stat) => true
      }).post(config.IMGBB_URL, form)
        .then(resp => resp.data.data)
      console.log('resp: ', resp)
      console.log('success: ',resp.success)
      result = resp.display_url
    }
    catch(err) {
      console.log(err)
      toast.show({
        title: err.message,
        placement: 'bottom',
      })
    } 
    return result
  }

  const editGroup = async () => {
    try {
      setIsLoading(true)
      const photoLink = await postPhoto(photo)
      const resp = put(`/group/${group._id}`, {
        name: name,
        description: description,
        photo: photoLink
      })
      if (resp.status >= 400) throw new Error(resp.data)
      setIsLoading(false)
    }
    catch (err) {
      setIsLoading(false)
      toast.show({
        title: err.message,
        placement: 'bottom',
      })
    }
  }
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content minW='95%'>
          <Modal.CloseButton />
          <Modal.Header>Edit Group</Modal.Header>
          <Modal.Body p='4'>
            <Center>
              <Avatar size='xl' source={{ uri: group.photo }}>-</Avatar>
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
            <PhotoUpload mt='4' pressedBgColor='gray.100' setPhoto={setPhoto} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space='2'>
              <Button size='sm' rounded='md' variant='outline' onPress={() => setIsOpen(false)}
                _pressed={{ bgColor: 'gray.200' }}>
                <Text color='black'>Cancel</Text>
              </Button>
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={editGroup}
                _pressed={{ bgColor: theme.blue[600] }}>
                <Text color='white'>Save</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
