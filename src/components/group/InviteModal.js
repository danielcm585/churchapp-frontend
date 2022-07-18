import React, { useEffect, useState } from 'react'

import theme from '@root/theme'
import { get, post } from '@root/http'

import { ProfileList } from '@root/components/profile'

import { useToast } from 'native-base'
import { Button, Modal, Text } from 'native-base'

export default function InviteModal({ isOpen, setIsOpen, groupId }) {
  const onClose = () => setIsOpen(false)

  const [ all, setAll ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)

  const toast = useToast()

  useEffect(async () => {
    try {
      const resp = await get('/user/')
      if (resp.status >= 400) throw new Error(resp.data)
      setAll(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }

    return () => setAll(null)

  }, [])

  const [ selected, setSelected ] = useState([ ])
  const sendInvite = () => {
    setIsLoading(true)
    selected.forEach(profile => {
      post(`/group/invite/${groupId}`, {
        user: profile._id
      })
    })
    setIsLoading(false)
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content minW='95%'>
          <Modal.CloseButton />
          <Modal.Header>Invite Member</Modal.Header>
          <Modal.Body p='4'>
            <ProfileList profiles={all} modal={true} select={true} setSelected={setSelected} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space='2'>
              <Button size='sm' rounded='md' variant='outline' onPress={onClose}
                _pressed={{ bgColor: 'gray.200' }}>
                <Text color='black'>Cancel</Text>
              </Button>
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={sendInvite}
                isLoading={isLoading} _pressed={{ bgColor: theme.blue[600] }}>
                <Text color='white'>Invite</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
