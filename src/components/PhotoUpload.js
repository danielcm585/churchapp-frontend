import React, { useState, useEffect } from 'react'
import DocumentPicker from 'react-native-document-picker'

import { post } from '../http'

import { Button, Text } from 'native-base'

export default function PhotoUpload({ setLink }) {
  const [ photo, setPhoto ] = useState()

  const selectPhoto = async () => {
    try {
      const resp = await DocumentPicker.pickSingle({
        presentationStyle: 'fullscreen',
        type: [ DocumentPicker.types.images ]
      })
      setPhoto(resp)
    }
    catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Cancelled')
      }
      else {
        alert('Unknow error: ' + JSON.stringify(err))
        throw(err)
      }
    }
  }

  useEffect(() => {
    console.log(photo?.uri)
  }, [ photo ])

  return (
    <>
      <Button mt='4' ml='6' mr='6' borderRadius='lg' variant='outline' backgroundColor='gray.100'
        _pressed={{ backgroundColor: 'gray.200' }} onPress={selectPhoto}>
        <Text color='black'>
          Add Photo
        </Text>
      </Button>
    </>
  )
}
