import React from 'react'

import theme from '../../../theme'

import { Modal, Button, Text } from 'native-base'

export default function ContactUsModal({ isOpen, setIsOpen }) {
  const contactUs = () => {

  }

  const onClose = () => setIsOpen(false)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content minW='95%'>
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body p='4'>
            <Text>We are open to any positive and negative feedbacks that can help us build this platform even better.</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space='2'>
              <Button size='sm' rounded='md' variant='outline' onPress={() => setIsOpen(false)}
                _pressed={{ bgColor: 'gray.200' }}>
                <Text color='black'>Cancel</Text>
              </Button>
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={() => {
                contactUs()
                onClose()
              }}
                _pressed={{ bgColor: theme.blue[600] }}>
                <Text color='white'>Continue</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
