import React, { useState } from 'react'

import theme from '../../../theme'

import { Button, Modal, Text, HStack, Icon, Input } from 'native-base'
import { MaterialCommunityIcons } from '@native-base/icons'

export default function ChangePasswordModal({ profile, isOpen, setIsOpen }) {
  const [ oldPass, setOldPass ] = useState('')
  const [ newPass, setNewPass ] = useState('')
  const [ confirmNew, setConfirmNew ] = useState('')

  const changePassword = () => {
    // TODO: PUT changes 
  }
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content minW='95%'>
          <Modal.CloseButton />
          <Modal.Header>Edit Group</Modal.Header>
          <Modal.Body p='4'>
            <HStack space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialCommunityIcons} name='lock-clock'></Icon>
              <Input w='89%' variant='underlined' placeholder='Old Password' value={oldPass}
                _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setOldPass(val)}
              />
            </HStack>
            <HStack mt='4' space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialCommunityIcons} name='lock'></Icon>
              <Input w='89%' variant='underlined' placeholder='New Password' value={newPass}
                _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setNewPass(val)}
              />
            </HStack>
            <HStack mt='4' space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialCommunityIcons} name='lock-check'></Icon>
              <Input w='89%' variant='underlined' placeholder='Confirm New Passwrod' value={confirmNew}
                _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setConfirmNew(val)}
              />
            </HStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space='2'>
              <Button size='sm' rounded='md' variant='outline' onPress={() => setIsOpen(false)}
                _pressed={{ bgColor: 'gray.200' }}>
                <Text color='black'>Cancel</Text>
              </Button>
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={changePassword}
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
