import React, { useState } from 'react'
import { Linking } from 'react-native'

import theme from '@root/theme'
import config from '@root/config'

import { useToast } from 'native-base'
import { Modal, Button, Text } from 'native-base'

export default function ContactUsModal({ isOpen, setIsOpen }) {
  const [ isLoading, setIsLoading ] = useState(false)
  
  const toast = useToast()

  const contactUs = async () => {
    setIsLoading(true)
    const url = `mailto:${config.SUPPORT_EMAIL}`
    const supported = await Linking.canOpenURL(url)
    if (supported) await Linking.openURL(url)
    else toast.show({
      title: 'Not supported',
      placement: 'bottom'
    })
    setIsLoading(false)
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
                isLoading={isLoading} _pressed={{ bgColor: theme.blue[600] }}>
                <Text color='white'>Continue</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
