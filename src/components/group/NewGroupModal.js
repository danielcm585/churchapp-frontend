import React, { useState } from 'react'
import axios from 'axios'
import * as FileSystem from 'expo-file-system'

import theme from '@root/theme'
import config from '@root/config'
import { post } from '@root/http'

import { PhotoUpload } from '@root/components'

import { useToast } from 'native-base'
import { Button, Modal, Text, HStack, Icon, Input, Center, Avatar, Select } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function NewGroupModal({ isOpen, setIsOpen }) {
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ status, setStatus ] = useState()
  const [ photo, setPhoto ] = useState()

  const [ isLoading, setIsLoading ] = useState(false)

  const toast = useToast()

  const postPhoto = async (photo) => {
    if (photo == null || photo.length === 0) return null
    if (photo.slice(0,4) === 'http') return photo
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
  
  const onClose = () => setIsOpen(false)

  const createGroup = async () => {
    try {
      setIsLoading(true)
      const photoLink = await postPhoto(photo)
      const resp = await post('/group/', {
        name: name,
        description: description,
        status: status,
        photo: photoLink
      })
      if (resp.status >= 400) throw new Error(resp.data)
      setIsLoading(false)
      onClose()
      toast.show({
        title: 'Group created',
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
      <Modal isOpen={isOpen} onClose={onClose}>
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
            <HStack mt='4' space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='lock'/>
              <Select minWidth='40%' selectedValue={status} placeholder='Group Status'
                onValueChange={val => setStatus(val)}>
                <Select.Item label='Private' value='PRIVATE' />
                <Select.Item label='Public' value='PUBLIC' />
              </Select>
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
