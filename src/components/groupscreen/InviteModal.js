import React, { useEffect, useState } from 'react'

import theme from '../../../theme'

import { SearchBar } from '../'
import { ProfileGrid } from '../profile'

import { Button, Modal, Text } from 'native-base'

export default function InviteModal({ isOpen, setIsOpen }) {
  const [ all, setAll ] = useState()
  useEffect(() => {
    console.log('FETCH ALL PROFILES')
  }, [])
  
  const [ keyword, setKeyword ] = useState('')
  const [ filtered, setFiltered ] = useState()
  useEffect(() => {
    if (all == null) return
    filteredProfiles = all.filter(profile => profile.name.toLowerCase().includes(keyword.toLowerCase()))
    setFiltered(filteredProfiles)
  }, [ keyword ])

  const [ selected, setSelected ] = useState()

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content minW='90%'>
          <Modal.CloseButton />
          <Modal.Header>Invite</Modal.Header>
          <Modal.Body p='4'>
            <SearchBar keyword={keyword} setKeyword={setKeyword} />
            {
              (filtered != null) &&
                <ProfileGrid profiles={filtered} />
            }
            {
              (selected != null) &&
                <Text>{selected.name} will be invited to this group</Text>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space='2'>
              <Button size='sm' rounded='md' variant='outline' onPress={() => setIsOpen(false)}
                _pressed={{ bgColor: 'gray.200' }}>
                <Text color='black'>Cancel</Text>
              </Button>
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={() => console.log('SEND INVITE')}
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
