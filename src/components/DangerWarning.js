import React from 'react'

import { AlertDialog, Button, Text } from 'native-base'

export default function DangerWarning({ isOpen, setIsOpen, title, action, onContinue }) {
  const onClose = () => setIsOpen(false);

  return (
    <>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{title}</AlertDialog.Header>
          <AlertDialog.Body>
            {`This action cannot be reversed. Are you sure you want to ${action.toLowerCase()}?`}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant='outline' bgColor='white' onPress={onClose}
                _pressed={{ bgColor: 'gray.100' }}>
                <Text>Cancel</Text>
              </Button>
              <Button bgColor='red.500' _pressed={{ bgColor: 'red.600' }} onPress={() => {
                onContinue()
                onClose()
              }}>
                <Text color='white'>{action}</Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  )
}
