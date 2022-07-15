import React from 'react'
import { Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { Button, Text } from 'native-base'
import { useEffect } from 'react'

export default function PhotoUpload({ setPhoto, bgColor, pressedBgColor, mt, mx }) {
  useEffect(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermission()
      if (status !== 'granted') {
        alert('Permission denied!')
      }
    }
  }, [])

  const selectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspects: 1,
      quality: 1
    })
    if (!result.cancelled) setPhoto(result.uri)
  }

  return (
    <>
      <Button mt={mt} mx={mx} borderRadius='lg' variant='outline' backgroundColor={bgColor}
        _pressed={{ backgroundColor: pressedBgColor }} onPress={selectPhoto}>
        <Text color='black'>
          Select Photo
        </Text>
      </Button>
    </>
  )
}
