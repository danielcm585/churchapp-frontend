import React, { useState } from 'react'

import theme from '@root/theme'

import { useToast } from 'native-base'
import { Button, HStack, Icon, Modal, Input, Text } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function ReportModal({ isOpen, setIsOpen, userId, postId, groupId }) {
  const onClose = () => setIsOpen(false)

  const [ report, setReport ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const toast = useToast()

  const validateInput = () => {
    if (report == null || report.length === 0) throw new Error('Report cannot be empty')
  }

  const sendReport = async () => {
    try {
      setIsLoading(true)
      validateInput()
      const resp = await post('/report', {
        report: report,
        postId: postId,
        userId: userId,
        groupId: groupId
      })
      if (resp.status >= 400) throw new Error(resp.data)
      toast.show({
        title: 'Report created',
        placement: 'bottom'
      })
      setIsLoading(false)
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
          <Modal.Header>Report</Modal.Header>
          <Modal.Body p='4'>
            <HStack w='100%' alignItems='center' justifyContent='space-between'>
              <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='report-problem' />
              <Input w='89%' variant='underlined' placeholder='Report' color={theme.blue[900]}
                _focus={{ borderColor: theme.blue[900] }} onChangeText={val => setReport(val)}
              />
            </HStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space='2'>
              <Button size='sm' rounded='md' variant='outline' onPress={() => setIsOpen(false)}
                _pressed={{ bgColor: 'gray.200' }}>
                <Text color='black'>Cancel</Text>
              </Button>
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={() => {
                  sendReport()
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
