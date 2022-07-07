import React, { useState } from 'react'

import theme from '../../../theme'
import { put } from '../../http'

import { PasswordInput } from '../'

import { useToast } from 'native-base'
import { Button, Modal, Text } from 'native-base'

export default function ChangePasswordModal({ profile, isOpen, setIsOpen }) {
  const onClose = () => setIsOpen(false)

  const [ oldPass, setOldPass ] = useState('')
  const [ newPass, setNewPass ] = useState('')
  const [ confirmNew, setConfirmNew ] = useState('')

  const toast = useToast()
  const [ isLoading, setIsLoading ] = useState(false)

  const validateInput = () => {
    if (oldPass == null || oldPass.length == 0) throw new Error('Old password cannot be empty')
    if (newPass == null || newPass.length == 0) throw new Error('New password cannot be empty')
    if (newPass != confirmNew) throw new Error('Password and confirm password do not match') 
  }

  const changePassword = async () => {
    try {
      setIsLoading(true)
      validateInput()
      const resp = await put('/user/change-password', {
        oldPassword: oldPass,
        newPassword: newPass
      })
      if (resp.status >= 400) throw new Error(resp.data)
      setIsLoading(false)
      onClose()
    }
    catch (err) {
      setIsLoading(false)
      toast.show({
        title: err.message,
        placement: 'bottom',
        status: 'error'
      })
    }
  }
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content minW='95%'>
          <Modal.CloseButton />
          <Modal.Header>Edit Group</Modal.Header>
          <Modal.Body p='4'>
            <PasswordInput mt='0' mx='0' placeholder='Old Password' icon='lock-clock' 
              value={oldPass} setValue={setOldPass} />
            <PasswordInput mt='4' mx='0' placeholder='New Password' icon='lock' 
              value={newPass} setValue={setNewPass} />
            <PasswordInput mt='4' mx='0' placeholder='Confirm New Password' icon='lock-check'
              value={confirmNew} setValue={setConfirmNew} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space='2'>
              <Button size='sm' rounded='md' variant='outline' onPress={() => setIsOpen(false)}
                _pressed={{ bgColor: 'gray.200' }}>
                <Text color='black'>Cancel</Text>
              </Button>
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={changePassword}
                isLoading={isLoading} _pressed={{ bgColor: theme.blue[600] }}>
                <Text color='white'>Save</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
