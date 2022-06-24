import React, { useEffect, useState } from 'react'

import theme from '../../../theme'

import { Button, Modal, Text } from 'native-base'
import { ProfileList } from '../profile'

export default function InviteModal({ isOpen, setIsOpen }) {
  const [ all, setAll ] = useState()
  useEffect(() => {
    setAll([
      {
        name: 'Daniel Christian Mandolang',
        username: 'danielcm1',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
        phone: '+62 813 1323 3290',
        birth: '2012-04-23T18:25:43.511Z'
      },
      {
        name: 'Daniel Christian Mandolang',
        username: 'danielcm1',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
        phone: '+62 813 1323 3290',
        birth: '2012-04-23T18:25:43.511Z'
      },
      {
        name: 'Daniel Christian Mandolang',
        username: 'danielcm1',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
        phone: '+62 813 1323 3290',
        birth: '2012-04-23T18:25:43.511Z'
      },
      {
        name: 'Daniel Christian Mandolang',
        username: 'danielcm1',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
        phone: '+62 813 1323 3290',
        birth: '2012-04-23T18:25:43.511Z'
      },
      {
        name: 'Daniel Christian Mandolang',
        username: 'danielcm1',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
        phone: '+62 813 1323 3290',
        birth: '2012-04-23T18:25:43.511Z'
      },
      {
        name: 'Daniel Christian Mandolang',
        username: 'danielcm1',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
        phone: '+62 813 1323 3290',
        birth: '2012-04-23T18:25:43.511Z'
      },
      {
        name: 'Daniel Christian Mandolang',
        username: 'danielcm1',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
        phone: '+62 813 1323 3290',
        birth: '2012-04-23T18:25:43.511Z'
      },
      {
        name: 'Daniel Christian Mandolang',
        username: 'danielcm1',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
        phone: '+62 813 1323 3290',
        birth: '2012-04-23T18:25:43.511Z'
      },
    ])
    console.log('FETCH ALL PROFILES')
  }, [])

  const [ selected, setSelected ] = useState([ ])
  const sendInvite = () => {
    selected.forEach(profile => {
      console.log(profile.name)
    })
    console.log('SEND INVITE')
  }

  console.log(selected)

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content minW='90%'>
          <Modal.CloseButton />
          <Modal.Header>Invite</Modal.Header>
          <Modal.Body p='4'>
            <ProfileList profiles={all} select={true} setSelected={setSelected} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space='2'>
              <Button size='sm' rounded='md' variant='outline' onPress={() => setIsOpen(false)}
                _pressed={{ bgColor: 'gray.200' }}>
                <Text color='black'>Cancel</Text>
              </Button>
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={sendInvite}
                _pressed={{ bgColor: theme.blue[600] }}>
                <Text color='white'>Invite</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
